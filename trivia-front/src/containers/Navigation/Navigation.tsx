import {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import {UserContext} from "../../context/UserContext";
import {guestUser} from "../../services/userServices";
import styles from "./Navigation.module.scss";
import Button from "../../components/Button/Button";

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

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(guestUser);
      navigate("/home");
    }
  };

  return (
    <>
      {(path === "/home" || path === "/profile") && (
        <nav className={styles.nav}>
          <Button handleClick={toHome} size={"small"}>
            Home
          </Button>
          {user.id > 0 && (
            <Button handleClick={toProfile} size={"small"}>
              Profile
            </Button>
          )}
          {user.id > 0 ? (
            <Button handleClick={logout} size={"small"}>
              Logout
            </Button>
          ) : (
            <Button handleClick={showLogin} size={"small"}>
              Login
            </Button>
          )}
          {showModal && <LoginModal closeModal={showLogin} />}
        </nav>
      )}
    </>
  );
};

export default Navigation;
