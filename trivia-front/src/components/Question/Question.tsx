import {TriviaQuestion} from "../../services/triviaApiServices";

interface QuestionProps {
  question: TriviaQuestion;
}

const Question: React.FC<QuestionProps> = ({question}) => {
  return (
    <div>
      <p>{question.question}</p>
    </div>
  );
};

export default Question;

// [
//   {
//     category: "Sports",
//     correct_answer: "True",
//     difficulty: "easy",
//     incorrect_answers: ["False"],
//     question: "Formula E is an auto racing series that uses hybrid",
//     type: "boolean",
//   },
//   {
//     category: "Sports",
//     correct_answer: "1985",
//     difficulty: "easy",
//     incorrect_answers: ["1983", "1984", "1986"],
//     question: "The first Super Bowl was held in 1967.",
//     type: "multiple",
//   },
// ];
