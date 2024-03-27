import {useEffect, useState} from "react";
import {TriviaQuestion, shuffleAnswers} from "../../services/triviaApiServices";
import AnswerButton from "../AnswerButton/AnswerButton";
import Button from "../Button/Button";

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
    <div>
      <p>{question.question}</p>
      <div>
        {answers.map((answer, i) => (
          <AnswerButton key={i} selectAnswer={selectAnswer}>
            {answer}
          </AnswerButton>
        ))}
      </div>
      <Button handleClick={handleSubmitAnswer}>Submit!</Button>
    </div>
  );
};

export default Question;
