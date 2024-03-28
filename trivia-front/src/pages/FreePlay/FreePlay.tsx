import {useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";
import styles from "../../Styles/GameStyles.module.scss";

const FreePlay = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startScreen, setStartScreen] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setQuestionIndex(0);
    setStartScreen(true);
  }, []);

  const fetchQuestions = async (difficulty: string, category: string) => {
    const response = await getTriviaQuestions({
      amount: 30,
      difficulty: difficulty,
      category: category,
    });
    setQuestions(response);
  };

  const toHome = () => {
    navigate("/home");
  };

  const handleStart = async (
    difficultyParam: string = difficulty,
    categoryParam: string = category,
    event: any
  ) => {
    event.preventDefault();
    await fetchQuestions(difficultyParam, categoryParam);
    setStartScreen(false);
    setQuestionIndex(0);
  };

  const handleNextQuestion = (result: boolean, multi: number) => {
    if (result) {
      console.log("correct " + multi * 10 + " Points!");
    } else {
      console.log("incorrect");
    }
    if (questionIndex === 29) {
      fetchQuestions(difficulty, category);
    } else {
      setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
    }
  };

  const renderStartScreen = () => {
    if (startScreen) {
      return (
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <Button handleClick={toHome} size={"small"}>
              Return Home
            </Button>
          </div>
          <div className={styles.cont__main}>
            <p className={styles.cont__main__head}>Free Play!</p>
            <p className={styles.cont__main__para}>
              No stress game mode! Choose any Category and Difficulty and test
              your knowledge!
            </p>
            <form className={styles.cont__main__diff}>
              <label className={styles.cont__main__diff__label}>
                Category:
                <select
                  className={styles.cont__main__diff__label__select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Entertainment: Books</option>
                  <option value="11">Entertainment: Film</option>
                  <option value="12">Entertainment: Music</option>
                  <option value="13">Entertainment: Musicals & Theatres</option>
                  <option value="14">Entertainment: Television</option>
                  <option value="15">Entertainment: Video Games</option>
                  <option value="16">Entertainment: Board Games</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Entertainment: Comics</option>
                  <option value="30">Science: Gadgets</option>
                  <option value="31">
                    Entertainment: Japanese Anime & Manga
                  </option>
                  <option value="32">
                    Entertainment: Cartoon & Animations
                  </option>
                </select>
              </label>
              <label className={styles.cont__main__diff__label}>
                Difficulty:
                <select
                  className={styles.cont__main__diff__label__select}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
              <Button
                handleClick={(event: any) =>
                  handleStart(difficulty, category, event)
                }
                size={"small"}>
                Start!
              </Button>
            </form>
          </div>
        </div>
      );
    }
  };

  const renderGame = () => {
    if (!startScreen) {
      return (
        <div className={styles.cont}>
          <div className={styles.cont__bar}>
            <Button handleClick={toHome} size={"small"}>
              Return Home
            </Button>
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

  return (
    <div>
      {renderStartScreen()}
      {renderGame()}
    </div>
  );
};

export default FreePlay;
