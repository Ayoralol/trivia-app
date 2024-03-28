import styles from "./GameDisplay.module.scss";

interface GameDisplayProps {
  tag: string;
  children: number;
}

const GameDisplay: React.FC<GameDisplayProps> = ({tag, children}) => {
  return (
    <div className={styles.cont}>
      <p className={styles.cont__head}>{tag}</p>
      <p className={styles.cont__value}>{children}</p>
    </div>
  );
};

export default GameDisplay;
