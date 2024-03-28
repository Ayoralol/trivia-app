import {useState, useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import Button from "../../components/Button/Button";
import styles from "./LoginModal.module.scss";

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({closeModal}) => {
  const {login, createNewUser} = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setNewUser(false);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newUser) {
      try {
        login(username, password);
      } catch (error) {
        console.error("Unable to log in", error);
      }
    } else {
      try {
        createNewUser(username, password);
      } catch (error) {
        console.error("Unable to create user", error);
      }
    }

    setUsername("");
    setPassword("");
  };

  const handleSwap = () => {
    setNewUser(!newUser);
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.cont}>
      <div className={styles.cont__main}>
        <div className={styles.cont__main__bar}>
          <Button handleClick={closeModal} size={"small"}>
            Close
          </Button>
        </div>
        <form className={styles.cont__main__form}>
          <div className={styles.cont__main__form__input}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.cont__main__form__input}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            handleClick={(event: any) => handleSubmit(event)}
            size={"small"}>
            {newUser ? "Create New Account" : "Log In"}
          </Button>
          <Button handleClick={handleSwap} size={"small"}>
            {newUser ? "Already have an account?" : "Need an Account?"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
