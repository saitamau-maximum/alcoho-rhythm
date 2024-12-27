import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ConditionAvg.module.css";

ConditionAvg.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function ConditionAvg({ fetchedData }) {
  const [conditionAvg, setConditionAvg] = useState(null);
  useEffect(() => {
    let conditionSum = 0;
    fetchedData.forEach((data) => {
      conditionSum += data.condition;
    });
    const roundedConditionAvg = (
      conditionSum / fetchedData.length || 0
    ).toFixed(1); //小数第1位まで計算

    setConditionAvg(roundedConditionAvg);
  }, [fetchedData]);
  return (
    <div className={styles.container}>
      <p>体調平均値</p>
      <span>{conditionAvg}</span>
    </div>
  );
}

export default ConditionAvg;
