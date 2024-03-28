import {useContext, useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import {UserContext} from "../../context/UserContext";
import {editUser} from "../../services/userServices";
import GameDisplay from "../../components/GameDisplay/GameDisplay";
import styles from "../../Styles/GameStyles.module.scss";

const TimeAttack = () => {
  const {user} = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startScreen, setStartScreen] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimer(0);
    setScore(0);
    setGameOver(false);
    setQuestionIndex(0);
    setStartScreen(true);
    setSelected(false);
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
    setSelected(true);
    handleStart("easy");
  };

  const handleStartMedium = async () => {
    setSelected(true);
    handleStart("easy");
  };

  const handleStartHard = async () => {
    setSelected(true);
    handleStart("hard");
  };

  const handleStartAny = async () => {
    setSelected(true);
    handleStart("");
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
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <Button handleClick={toHome} size={"small"}>
              Return Home
            </Button>
          </div>
          <div className={styles.cont__main}>
            <p className={styles.cont__main__head}>Time Attack Mode!</p>
            <p className={styles.cont__main__para}>
              You have 3 minutes to answer up to 30 questions, with a bonus for
              time left over!
            </p>
            <p className={styles.cont__main__para}>
              Choose your difficulty to start!
            </p>
            <div className={styles.cont__main__diff}>
              <Button
                handleClick={handleStartEasy}
                size={"medium"}
                selected={selected}>
                Easy!
              </Button>
              <Button
                handleClick={handleStartMedium}
                size={"medium"}
                selected={selected}>
                Medium!
              </Button>
              <Button
                handleClick={handleStartHard}
                size={"medium"}
                selected={selected}>
                Hard!
              </Button>
              <Button
                handleClick={handleStartAny}
                size={"medium"}
                selected={selected}>
                Any!
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderGame = () => {
    if (!gameOver && !startScreen) {
      return (
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <GameDisplay tag={"Time "}>{timer}</GameDisplay>
            <GameDisplay tag={"Score "}>{score}</GameDisplay>
          </div>
          <div className={styles.cont__main}>
            <Question
              handleSubmit={handleNextQuestion}
              question={questions[questionIndex]}
            />
          </div>
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
      <div className={styles.contG}>
        <div className={styles.contG__main}>
          <p className={styles.contG__main__head}>Game Over!</p>
          <p className={styles.contG__main__para}>Your Score was: {score}</p>
          {isNewHighScore ? (
            <p className={styles.contG__main__para}>
              New Time Attack High Score!: {score}
            </p>
          ) : (
            user.id !== -1 && (
              <p className={styles.contG__main__para}>
                Your Time Attack High Score is: {user.high_score_ta}
              </p>
            )
          )}
          {user.id === -1 && (
            <p className={styles.contG__main__para}>
              Login next time to save your score!
            </p>
          )}
          <div className={styles.contG__main__diff}>
            <Button handleClick={toHome} size={"medium"}>
              Return Home!
            </Button>
          </div>
        </div>
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
