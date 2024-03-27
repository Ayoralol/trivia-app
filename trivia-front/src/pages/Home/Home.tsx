import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

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
    <div>
      <Button handleClick={toSurvival}>Play Survival!</Button>
      <p>
        Survival pulls continuous questions from any category and difficulty
        until you get 3 wrong!
      </p>
      <Button handleClick={toTimeAttack}>Play Time Attack!</Button>
      <p>
        Time Attack pulls a random 20 questions that you have to answer as fast
        as possible!
      </p>
      <Button handleClick={toFreePlay}>Play Free Play!</Button>
      <p>
        Free Play lets you choose the category and difficulty of the questions
        you want to answer!
      </p>
    </div>
  );
};

export default Home;
