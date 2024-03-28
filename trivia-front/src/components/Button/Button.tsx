import styles from "./Button.module.scss";

interface ButtonProps {
  handleClick: (event: any) => void;
  size: "small" | "medium" | "large";
  children: string;
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  size,
  children,
  selected,
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        handleClick(event);
      }}
      className={`${styles.btn} ${styles[size]} ${
        selected ? styles.selected : null
      }`}>
      {children}
    </button>
  );
};

export default Button;
