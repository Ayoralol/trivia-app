import {useContext, useState} from "react";
import NavButton from "../../components/NavButton/NavButton";
import {useLocation, useNavigate} from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import {UserContext} from "../../context/UserContext";
import {guestUser} from "../../services/userServices";

const Navigation = () => {
  const {user, setUser} = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const toHome = () => {
    setShowModal(false);
    navigate("/home");
  };

  const toProfile = () => {
    setShowModal(false);
    navigate("/profile");
  };

  const showLogin = () => {
    if (showModal) {
      setShowModal(false);
    } else setShowModal(true);
  };

  const endGame = () => {
    navigate("/");
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(guestUser);
      navigate("/home");
    }
  };

  return (
    <nav>
      {(path === "/home" || path === "/profile") && (
        <>
          <NavButton handleClick={toHome} page={"home"}>
            Home
          </NavButton>
          {user.id > 0 && (
            <NavButton handleClick={toProfile} page={"profile"}>
              Profile
            </NavButton>
          )}
          {user.id > 0 ? (
            <NavButton handleClick={logout} page={"login"}>
              Logout
            </NavButton>
          ) : (
            <NavButton handleClick={showLogin} page={"login"}>
              Login
            </NavButton>
          )}
          {showModal && <LoginModal closeModal={showLogin} />}
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
