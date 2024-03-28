import {useState, useContext} from "react";
import {UserContext} from "../../context/UserContext";
import Button from "../../components/Button/Button";

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({closeModal}) => {
  const {login} = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      login(username, password);
    } catch (error) {
      console.error("Unable to log in", error);
    }
  };

  return (
    <div>
      <Button handleClick={closeModal}>X</Button>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button handleClick={(event: any) => handleSubmit(event)}>Login</Button>
      </form>
    </div>
  );
};

export default LoginModal;
