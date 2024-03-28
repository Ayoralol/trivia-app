import {createContext, useState} from "react";
import {
  User,
  createUser,
  getUserById,
  guestUser,
  loginUser,
} from "../services/userServices";

export interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  login: (username: string, password: string) => void;
  reloadUser: (id: number) => void;
  createNewUser: (username: string, password: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: guestUser,
  setUser: () => {},
  login: () => {},
  reloadUser: () => {},
  createNewUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>(guestUser);

  const login = async (username: string, password: string) => {
    try {
      const user = await loginUser(username, password);
      setUser(user);
    } catch (error) {
      console.error("Unable to Log In", error);
    }
  };

  const reloadUser = async (id: number) => {
    if (id === -1) {
      return;
    }
    try {
      const updatedUser = await getUserById(id);
      setUser(updatedUser);
    } catch (error) {
      console.error("Unable to reload user", error);
    }
  };

  const createNewUser = async (username: string, password: string) => {
    try {
      const user = await createUser(username, password);
      setUser(user);
    } catch (error) {
      console.error("Unable to Create User", error);
    }
  };

  return (
    <UserContext.Provider
      value={{user, setUser, login, reloadUser, createNewUser}}>
      {children}
    </UserContext.Provider>
  );
};
