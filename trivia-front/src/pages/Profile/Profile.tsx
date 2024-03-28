import {useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";

const Profile = () => {
  const {user, reloadUser} = useContext(UserContext);

  useEffect(() => {
    reloadUser(user.id);
  }, [user]);

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
