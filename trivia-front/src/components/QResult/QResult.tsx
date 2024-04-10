import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import styles from "./QResult.module.scss";

interface QResultProps {
  result: boolean;
}

const QResult: React.FC<QResultProps> = ({result}) => {
  const [size, setSize] = useState("big");
  const resultIcon = result ? faCheck : faXmark;

  return (
    <div className={styles.cont}>
      <FontAwesomeIcon
        icon={resultIcon}
        className={`${styles.cont__icon} ${styles[size]}`}
      />
    </div>
  );
};

export default QResult;
