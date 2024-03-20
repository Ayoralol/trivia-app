import {useState} from "react";
import NavButton from "../../components/NavButton/NavButton";
import {useLocation, useNavigate} from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/home");
  };

  const toProfile = () => {
    navigate("/profile");
  };

  const showLogin = () => {
    setShowModal(true);
  };

  const endGame = () => {
    navigate("/");
  };

  return (
    <nav>
      {(path === "/home" || path === "/profile") && (
        <>
          <NavButton handleClick={toHome} page={"home"}>
            Home
          </NavButton>
          <NavButton handleClick={toProfile} page={"profile"}>
            Profile
          </NavButton>
          <NavButton handleClick={showLogin} page={"login"}>
            Login
          </NavButton>
          {showModal && <LoginModal />}
        </>
      )}
      {(path === "/survival" || path === "/time-attack") && (
        <>
          <p>Time Left</p>
          <NavButton handleClick={endGame} page={"game"}>
            Finish Game
          </NavButton>
          <p>Score</p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
