import styles from "./NavButton.module.scss";

interface NavButtonProps {
  handleClick: () => void;
  children: string;
  page: string;
}

const NavButton: React.FC<NavButtonProps> = ({handleClick, children, page}) => {
  return (
    <button onClick={handleClick} className={styles[page]}>
      {children}
    </button>
  );
};

export default NavButton;
