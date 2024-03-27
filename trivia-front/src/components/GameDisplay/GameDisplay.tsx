interface GameDisplayProps {
  tag: string;
  children: number;
}

const GameDisplay: React.FC<GameDisplayProps> = ({tag, children}) => {
  return (
    <div>
      <p>{tag}</p>
      <p>{children}</p>
    </div>
  );
};

export default GameDisplay;
