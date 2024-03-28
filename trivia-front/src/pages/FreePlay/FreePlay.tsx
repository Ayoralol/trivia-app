import {useEffect, useState} from "react";
import {getTriviaQuestions} from "../../services/triviaApiServices";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Question from "../../components/Question/Question";

const FreePlay = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startScreen, setStartScreen] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
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
        <div>
          <Button handleClick={toHome}>Return Home</Button>
          <h1>Free Play!</h1>
          <p>
            No stress game mode! Choose any Category and Difficulty and test
            your knowledge!
          </p>
          <form>
            <label>
              Category:
              <select
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
                <option value="32">Entertainment: Cartoon & Animations</option>
              </select>
            </label>
            <label>
              Difficulty:
              <select
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
              }>
              Start!
            </Button>
          </form>
        </div>
      );
    }
  };

  const renderGame = () => {
    if (!startScreen) {
      return (
        <div>
          <Button handleClick={toHome}>Return Home</Button>
          <Question
            handleSubmit={handleNextQuestion}
            question={questions[questionIndex]}
          />
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

// ### Category ID's

// - 9 - General Knowledge
// - 10 - Entertainment: Books
// - 11 - Entertainment: Film
// - 12 - Entertainment: Music
// - 13 - Entertainment: Musical & Theatres
// - 14 - Entertainment: Television
// - 15 - Entertainment: Video Games
// - 16 - Entertainment: Board Games
// - 17 - Science & Nature
// - 18 - Science: Computers
// - 19 - Science: Mathematics
// - 20 - Mythology
// - 21 - Sports
// - 22 - Geography
// - 23 - History
// - 24 - Politics
// - 25 - Art
// - 26 - Celebrities
// - 27 - Animals
// - 28 - Vehicles
// - 29 - Entertainment: Comics
// - 30 - Science: Gadgets
// - 31 - Entertainment: Japanese Anime & Manga
// - 32 - Entertainment: Cartoon & Animations
