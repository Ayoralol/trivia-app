import {useContext, useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import {UserContext} from "../../context/UserContext";
import {editUser} from "../../services/userServices";
import GameDisplay from "../../components/GameDisplay/GameDisplay";
import styles from "../../Styles/GameStyles.module.scss";

const Survival = () => {
  const {user} = useContext(UserContext);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [lives, setLives] = useState(3);
  const [difficulty, setDifficulty] = useState("easy");
  const [selected, setSelected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimer(0);
    setScore(0);
    setGameOver(false);
    setQuestionIndex(0);
    setStartScreen(true);
    setBreakTime(false);
    setLives(3);
    setSelected(false);
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
    setSelected(true);
    handleContinue("easy");
  };

  const handleStartMedium = async () => {
    setSelected(true);
    handleContinue("medium");
  };

  const handleStartHard = async () => {
    setSelected(true);
    handleContinue("hard");
  };

  const handleStartAny = async () => {
    setSelected(true);
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
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <Button handleClick={toHome} size={"small"}>
              Return Home
            </Button>
          </div>
          <div className={styles.cont__main}>
            <p className={styles.cont__main__head}>Survival Mode!</p>
            <p className={styles.cont__main__para}>
              Answer questions until you get 3 wrong! You will have a 20 second
              timer per question and will get a break after 15 questions!
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
    if (!gameOver && !breakTime && !startScreen) {
      return (
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <GameDisplay tag={"Time "}>{timer}</GameDisplay>
            <GameDisplay tag={"Lives "}>{lives}</GameDisplay>
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

  const renderBreak = () => {
    if (breakTime && !gameOver && !startScreen) {
      return (
        <div className={styles.contG}>
          <div className={styles.contG__main}>
            <p className={styles.contG__main__head}>Break Time!</p>
            <p className={styles.contG__main__para}>Your'e doing great!</p>
            <div className={styles.contG__main__diff}>
              <Button handleClick={handleContinue} size={"medium"}>
                Keep Going!
              </Button>
            </div>
          </div>
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
      <div className={styles.contG}>
        <div className={styles.contG__main}>
          <p className={styles.contG__main__head}>Game Over!</p>
          <p className={styles.contG__main__para}>Your score was: {score}</p>
          {isNewHighScore ? (
            <p className={styles.contG__main__para}>New High Score!: {score}</p>
          ) : (
            user.id !== -1 && (
              <p className={styles.contG__main__para}>
                Your Survival High Score is: {user.high_score_surv}
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
    <>
      {renderStartScreen()}
      {renderGame()}
      {renderBreak()}
      {gameOver && renderGameOver()}
    </>
  );
};

export default Survival;
