import {useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../../components/Timer/Timer";
import Score from "../../components/Score/Score";

const Survival = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [breakTime, setBreakTime] = useState(false);
  const [startScreen, setStartScreen] = useState(true);

  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const response = await getTriviaQuestions({amount: 15});
    setQuestions(response);
  };

  useEffect(() => {
    setTimer(0);
    setScore(0);
    setGameOver(false);
    setQuestionIndex(0);
    setStartScreen(true);
  }, []);

  const toHome = () => {
    navigate("/home");
  };

  const handleStart = async () => {
    await fetchQuestions();
    console.log(questions);
    setStartScreen(false);
  };

  const renderStartScreen = () => {
    if (startScreen) {
      return (
        <div>
          <Button handleClick={toHome}>Return Home</Button>
          <h1>Survival Mode!</h1>
          <p>
            Answer questions until you get 3 wrong! You will have a 20 second
            timer per question and will get a break after 15 questions!
          </p>
          <Button handleClick={handleStart}>Start</Button>
        </div>
      );
    }
  };

  const renderGame = () => {
    if (!gameOver && !breakTime && !startScreen) {
      return (
        <div>
          <Timer>{timer}</Timer>
          <Score>{score}</Score>
          <Question question={questions[questionIndex]} />
        </div>
      );
    }
  };

  return (
    <div>
      {renderStartScreen()}
      {renderGame()}
    </div>
  );
};

export default Survival;

// Need - Timer for Survival
// Need - Score for Survival
// Need - Game Over for Survival
// Need - "Break" Screen to fetch more questions
