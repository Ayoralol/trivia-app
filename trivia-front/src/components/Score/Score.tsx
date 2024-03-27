interface ScoreProps {
  children: number;
}

const Score: React.FC<ScoreProps> = ({children}) => {
  return <div>{children}</div>;
};

export default Score;
