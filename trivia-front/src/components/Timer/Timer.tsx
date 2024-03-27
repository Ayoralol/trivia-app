interface TimerProps {
  children: number;
}

const Timer: React.FC<TimerProps> = ({children}) => {
  return <div>{children}</div>;
};

export default Timer;
