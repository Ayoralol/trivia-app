import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import styles from "./QResult.module.scss";

interface QResultProps {
  result: boolean;
}

const QResult: React.FC<QResultProps> = ({result}) => {
  const [size, setSize] = useState("small");
  const resultIcon = result ? faCheck : faXmark;
  const color = result ? "correct" : "incorrect";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSize("big");
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [result]);

  return (
    <div className={styles.cont}>
      <FontAwesomeIcon
        icon={resultIcon}
        className={`${styles.cont__icon} ${styles[size]} ${styles[color]}`}
      />
    </div>
  );
};

export default QResult;
