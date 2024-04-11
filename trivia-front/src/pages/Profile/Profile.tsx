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
        <div className={styles.section}>
          <p className={styles.cont__head}>Username</p>
          <p className={styles.cont__para}>{user.username}</p>
        </div>
        <div className={styles.sec}>
          <div className={styles.section}>
            <p className={styles.cont__head}>Survival High Score</p>
            <p className={styles.cont__para}>{user.high_score_surv}</p>
          </div>
          <div className={styles.section}>
            <p className={styles.cont__head}>Time Attack High Score</p>
            <p className={styles.cont__para}>{user.high_score_ta}</p>
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.cont__head}>Lifetime Points</p>
          <p className={styles.cont__para}>{user.high_score_surv}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.cont__head}>Level</p>
          <p className={styles.cont__para}>{user.high_score_surv}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
