import {useEffect, useState} from "react";
import {TriviaQuestion, shuffleAnswers} from "../../services/triviaApiServices";
import AnswerButton from "../AnswerButton/AnswerButton";
import Button from "../Button/Button";
import styles from "./Question.module.scss";
import QResult from "../QResult/QResult";

interface QuestionProps {
  handleSubmit: (result: boolean, multi: number) => void;
  question: TriviaQuestion;
}

const Question: React.FC<QuestionProps> = ({handleSubmit, question}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [haveResult, setHaveResult] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    setHaveResult(false);
    shuffleAnswers(shuffledAnswers);
    setAnswers(shuffledAnswers);
    setSelectedAnswer("");
  }, [question]);

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    let multi =
      question.difficulty === "easy"
        ? 1
        : question.difficulty === "medium"
        ? 2
        : 4;

    if (question.type === "multiple") {
      multi *= 1.5;
    }

    const newResult = selectedAnswer === question.correct_answer;
    setResult(newResult);
    setHaveResult(true);
    // Add animation class to the result
    setTimeout(() => {
      handleSubmit(newResult, multi);
    }, 1000);
  };

  return (
    <div className={styles.cont}>
      <p className={styles.cont__question}>{question.question}</p>
      <div className={styles.cont__answers}>
        {answers.map((answer, i) => (
          <AnswerButton
            key={i}
            selectAnswer={selectAnswer}
            selectedAnswer={selectedAnswer}>
            {answer}
          </AnswerButton>
        ))}
      </div>
      <Button
        handleClick={handleSubmitAnswer}
        size={"medium"}
        selected={selectedAnswer == "" ? true : false}>
        Submit!
      </Button>
      {haveResult && <QResult result={result} />}
    </div>
  );
};

export default Question;
