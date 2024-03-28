import Button from "../Button/Button";

interface AnswerButtonProps {
  children: string;
  selectAnswer: (answer: string) => void;
  selectedAnswer: string;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  selectAnswer,
  children,
  selectedAnswer,
}) => {
  const handleAnswer = () => {
    selectAnswer(children);
  };

  return (
    <Button
      handleClick={handleAnswer}
      size={"large"}
      selected={selectedAnswer == children ? true : false}>
      {children}
    </Button>
  );
};

export default AnswerButton;
