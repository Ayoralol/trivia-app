import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

const Landing = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/home");
  };

  return <Button handleClick={toHome}>Lets Start!</Button>;
};

export default Landing;
