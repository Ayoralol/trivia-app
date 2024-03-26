import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

const Profile = () => {
  const {user} = useContext(UserContext);

  return (
    <div>
      <p>Username</p>
      <p>{user.username}</p>
      <p>Survival High Score</p>
      <p>{user.high_score_surv}</p>
      <p>Time Attack High Score</p>
      <p>{user.high_score_ta}</p>
    </div>
  );
};

export default Profile;
