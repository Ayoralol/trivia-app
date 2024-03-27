import Button from "../Button/Button";

interface AnswerButtonProps {
  children: string;
  selectAnswer: (answer: string) => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  selectAnswer,
  children,
}) => {
  const handleAnswer = () => {
    selectAnswer(children);
  };

  return <Button handleClick={handleAnswer}>{children}</Button>;
};

export default AnswerButton;
