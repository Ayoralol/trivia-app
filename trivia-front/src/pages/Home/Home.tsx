import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Home.module.scss";
// import QResult from "../../components/QResult/QResult";

const Home = () => {
  const navigate = useNavigate();

  const toSurvival = () => {
    navigate("/survival");
  };

  const toTimeAttack = () => {
    navigate("/time-attack");
  };

  const toFreePlay = () => {
    navigate("/free-play");
  };

  return (
    <div className={styles.cont}>
      {/* <QResult result={true} /> */}
      <div className={styles.cont__option}>
        <p className={styles.cont__option__head}>Survival!</p>
        <p className={styles.cont__option__para}>
          Pulls continuous questions from any category and difficulty until you
          get 3 wrong!
        </p>
        <Button handleClick={toSurvival} size={"large"}>
          Play Survival!
        </Button>
      </div>
      <div className={styles.cont__option}>
        <p className={styles.cont__option__head}>Time Attack!</p>
        <p className={styles.cont__option__para}>
          Pulls a random 30 questions that you have to answer as fast as
          possible!
        </p>
        <Button handleClick={toTimeAttack} size={"large"}>
          Play Time Attack!
        </Button>
      </div>
      <div className={styles.cont__option}>
        <p className={styles.cont__option__head}>Free Play!</p>
        <p className={styles.cont__option__para}>
          Lets you choose the category and difficulty of the questions you want
          to answer!
        </p>
        <Button handleClick={toFreePlay} size={"large"}>
          Play Free Play!
        </Button>
      </div>
    </div>
  );
};

export default Home;
