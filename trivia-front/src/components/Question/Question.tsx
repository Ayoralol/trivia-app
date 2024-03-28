import {useEffect, useState} from "react";
import {TriviaQuestion, shuffleAnswers} from "../../services/triviaApiServices";
import AnswerButton from "../AnswerButton/AnswerButton";
import Button from "../Button/Button";
import styles from "./Question.module.scss";

interface QuestionProps {
  handleSubmit: (result: boolean, multi: number) => void;
  question: TriviaQuestion;
}

const Question: React.FC<QuestionProps> = ({handleSubmit, question}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
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

    if (selectedAnswer === question.correct_answer) {
      handleSubmit(true, multi);
    } else {
      handleSubmit(false, multi);
    }
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
    </div>
  );
};

export default Question;
