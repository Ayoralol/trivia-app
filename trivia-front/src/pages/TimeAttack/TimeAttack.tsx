import {useContext, useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import {UserContext} from "../../context/UserContext";
import {editUser} from "../../services/userServices";
import GameDisplay from "../../components/GameDisplay/GameDisplay";

const TimeAttack = () => {
  const {user} = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startScreen, setStartScreen] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");

  const navigate = useNavigate();

  useEffect(() => {
    setTimer(0);
    setScore(0);
    setGameOver(false);
    setQuestionIndex(0);
    setStartScreen(true);
  }, []);

  useEffect(() => {
    let interval: number | null = null;

    if (timer > 0 && !gameOver && !startScreen) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!timer && !gameOver && !startScreen) {
      clearInterval(interval!);
      setGameOver(true);
    } else {
      clearInterval(interval!);
    }

    return () => {
      clearInterval(interval!);
    };
  }, [timer, gameOver, startScreen]);

  const fetchQuestions = async (difficulty: string) => {
    const response = await getTriviaQuestions({
      amount: 30,
      difficulty: difficulty,
    });
    setQuestions(response);
  };

  const toHome = () => {
    navigate("/home");
  };

  const handleStart = async (difficultyParam: string = difficulty) => {
    setDifficulty(difficultyParam);
    await fetchQuestions(difficultyParam);
    setStartScreen(false);
    setQuestionIndex(0);
    setTimer(180);
  };

  const handleStartEasy = async () => {
    setDifficulty("easy");
    handleStart();
  };

  const handleStartMedium = async () => {
    setDifficulty("medium");
    handleStart();
  };

  const handleStartHard = async () => {
    setDifficulty("hard");
    handleStart();
  };

  const handleStartAny = async () => {
    setDifficulty("");
    handleStart();
  };

  const handleNextQuestion = (result: boolean, multi: number) => {
    if (result) {
      setScore((prevScore) => prevScore + 10 * multi);
    }

    if (questionIndex === 29) {
      setGameOver(true);
    } else {
      setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    }
  };

  const renderStartScreen = () => {
    if (startScreen && !gameOver) {
      return (
        <div>
          <Button handleClick={toHome}>Return Home</Button>
          <h1>Time Attack Mode!</h1>
          <p>
            You have 3 minutes to answer up to 30 questions, with a bonus for
            time left over!
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
    if (!gameOver && !startScreen) {
      return (
        <div>
          <GameDisplay tag={"Time "}>{timer}</GameDisplay>
          <GameDisplay tag={"Score "}>{score}</GameDisplay>
          <Question
            handleSubmit={handleNextQuestion}
            question={questions[questionIndex]}
          />
        </div>
      );
    }
  };

  const renderGameOver = () => {
    let isNewHighScore = false;
    if (score > user.high_score_ta && user.id > 0) {
      editUser(user.id, {high_score_ta: score});
      isNewHighScore = true;
    }

    return (
      <div>
        <h1>Game Over!</h1>
        <p>Your Score was: {score}</p>
        {isNewHighScore ? (
          <p>New Time Attack High Score!: {score}</p>
        ) : (
          user.id !== -1 && (
            <p>Your Time Attack High Score is: {user.high_score_ta}</p>
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
      {gameOver && renderGameOver()}
    </div>
  );
};

export default TimeAttack;
