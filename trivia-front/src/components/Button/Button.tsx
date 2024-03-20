interface ButtonProps {
  handleClick: () => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({handleClick, children}) => {
  return <button onClick={handleClick}>{children}</button>;
};

export default Button;
