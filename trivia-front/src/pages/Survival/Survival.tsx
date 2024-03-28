import {useContext, useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import {UserContext} from "../../context/UserContext";
import {editUser} from "../../services/userServices";
import GameDisplay from "../../components/GameDisplay/GameDisplay";

const Survival = () => {
  const {user} = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [breakTime, setBreakTime] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [lives, setLives] = useState(3);
  const [difficulty, setDifficulty] = useState("easy");

  const navigate = useNavigate();

  useEffect(() => {
    setTimer(0);
    setScore(0);
    setGameOver(false);
    setQuestionIndex(0);
    setStartScreen(true);
    setBreakTime(false);
    setLives(3);
  }, []);

  useEffect(() => {
    let interval: number | null = null;

    if (timer > 0 && !gameOver && !breakTime && !startScreen) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!timer && !gameOver && !breakTime && !startScreen) {
      clearInterval(interval!);
      handleNextQuestion(false, 1);
    } else {
      clearInterval(interval!);
    }

    return () => {
      clearInterval(interval!);
    };
  }, [timer, gameOver, breakTime, startScreen]);

  const fetchQuestions = async (difficulty: string) => {
    const response = await getTriviaQuestions({
      amount: 15,
      difficulty: difficulty,
    });
    setQuestions(response);
  };

  const toHome = () => {
    navigate("/home");
  };

  const handleContinue = async (difficultyParam: string = difficulty) => {
    setDifficulty(difficultyParam);
    if (!breakTime) {
      setLives(3);
    }
    await fetchQuestions(difficultyParam);
    setStartScreen(false);
    setBreakTime(false);
    setQuestionIndex(0);
    setTimer(20);
  };

  const handleStartEasy = async () => {
    handleContinue("easy");
  };

  const handleStartMedium = async () => {
    handleContinue("medium");
  };

  const handleStartHard = async () => {
    handleContinue("hard");
  };

  const handleStartAny = async () => {
    handleContinue("");
  };

  const handleNextQuestion = (result: boolean, multi: number) => {
    if (result) {
      setScore((prevScore) => prevScore + 10 * multi);
    } else {
      if (lives === 1) {
        setGameOver(true);
        return;
      }
      setLives((prevLives) => prevLives - 1);
    }

    if (questionIndex === 14) {
      setBreakTime(true);
    } else {
      setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      setTimer(20);
    }
  };

  const renderStartScreen = () => {
    if (startScreen && !gameOver && !breakTime) {
      return (
        <div>
          <Button handleClick={toHome}>Return Home</Button>
          <h1>Survival Mode!</h1>
          <p>
            Answer questions until you get 3 wrong! You will have a 20 second
            timer per question and will get a break after 15 questions!
          </p>
          <p>Choose your difficulty to start!</p>
          <Button handleClick={handleStartEasy}>Easy!</Button>
          <Button handleClick={handleStartMedium}>Medium!</Button>
          <Button handleClick={handleStartHard}>Hard!</Button>
          <Button handleClick={handleStartAny}>Any!</Button>
        </div>
      );
    }
  };

  const renderGame = () => {
    if (!gameOver && !breakTime && !startScreen) {
      return (
        <div>
          <GameDisplay tag={"Time "}>{timer}</GameDisplay>
          <GameDisplay tag={"Score "}>{score}</GameDisplay>
          <GameDisplay tag={"Lives "}>{lives}</GameDisplay>
          <Question
            handleSubmit={handleNextQuestion}
            question={questions[questionIndex]}
          />
        </div>
      );
    }
  };

  const renderBreak = () => {
    if (breakTime && !gameOver && !startScreen) {
      return (
        <div>
          <h1>Break Time!</h1>
          <Button handleClick={handleContinue}>Continue</Button>
        </div>
      );
    }
  };

  const renderGameOver = () => {
    let isNewHighScore = false;
    if (score > user.high_score_surv && user.id > 0) {
      editUser(user.id, {high_score_surv: score});
      isNewHighScore = true;
    }

    return (
      <div>
        <h1>Game Over!</h1>
        <p>Your score was: {score}</p>
        {isNewHighScore ? (
          <p>New High Score!: {score}</p>
        ) : (
          user.id !== -1 && (
            <p>Your Survival High Score is: {user.high_score_surv}</p>
          )
        )}
        {user.id === -1 && <p>Login next time to save your score!</p>}
        <Button handleClick={toHome}>Return Home!</Button>
      </div>
    );
  };

  return (
    <div>
      {renderStartScreen()}
      {renderGame()}
      {renderBreak()}
      {gameOver && renderGameOver()}
    </div>
  );
};

export default Survival;
