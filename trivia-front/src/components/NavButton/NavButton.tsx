interface NavButtonProps {
  handleClick: () => void;
  children: string;
  page: string;
}

const NavButton: React.FC<NavButtonProps> = ({handleClick, children, page}) => {
  return <button onClick={handleClick}>{children}</button>;
};

export default NavButton;
