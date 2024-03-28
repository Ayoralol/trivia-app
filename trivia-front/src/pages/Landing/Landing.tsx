import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Landing.module.scss";

const Landing = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <Button handleClick={toHome} size={"large"}>
        Lets Start!
      </Button>
    </div>
  );
};

export default Landing;
