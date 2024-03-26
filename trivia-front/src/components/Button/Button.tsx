interface ButtonProps {
  handleClick: (event: any) => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({handleClick, children}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        handleClick(event);
      }}>
      {children}
    </button>
  );
};

export default Button;
