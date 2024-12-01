import { useEffect, useState } from "react";

function ConditionAvg({ fetchedData }) {
  const [conditionAvg, setConditionAvg] = useState(null);
  useEffect(() => {
    let conditionSum = 0;
      fetchedData.forEach((data) => {
        conditionSum += data.condition;
      });
    const roundedConditionAvg = (
      (conditionSum / fetchedData.length) || 0
    ).toFixed(1); //小数第1位まで計算

    setConditionAvg(roundedConditionAvg);
  }, [fetchedData]);
  return <div>体調平均: {conditionAvg}</div>;
}

export default ConditionAvg;
