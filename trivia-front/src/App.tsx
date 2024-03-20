import {useEffect, useState} from "react";
import "./App.css";
import {getTriviaQuestions} from "./services/triviaServices";
import Q from "./components/Q/Q";
import {TriviaQuestion} from "./services/triviaServices";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getTriviaQuestions(10, 9, "easy", "multiple")
      .then((data) => {
        setQuestions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {questions.map((q: TriviaQuestion, i: number) => (
        <Q key={i} {...q} />
      ))}
    </>
  );
}

export default App;
