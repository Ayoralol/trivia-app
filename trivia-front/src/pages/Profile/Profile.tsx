import {useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext";
import styles from "./Profile.module.scss";

const Profile = () => {
  const {user, reloadUser} = useContext(UserContext);

  useEffect(() => {
    reloadUser(user.id);
  }, [user]);

  return (
    <div className={styles.out}>
      <div className={styles.cont}>
        <p className={styles.cont__head}>Username</p>
        <p className={styles.cont__para}>{user.username}</p>
        <p className={styles.cont__head}>Survival High Score</p>
        <p className={styles.cont__para}>{user.high_score_surv}</p>
        <p className={styles.cont__head}>Time Attack High Score</p>
        <p className={styles.cont__para}>{user.high_score_ta}</p>
      </div>
    </div>
  );
};

export default Profile;
