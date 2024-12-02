import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ConditionAvg.css";

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
    <div className="condition-avg-container">
      <h1>体調平均値</h1>
      <p>{conditionAvg}</p>
    </div>
  );
}

export default ConditionAvg;
