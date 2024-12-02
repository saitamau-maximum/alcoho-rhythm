export const calcPureAlcoholQuantityAvg = (fetchedData) => {
  const conditionsSum = [0, 0, 0, 0, 0];
  fetchedData.forEach((data) => {
    conditionsSum[data.condition-1] += data.alcohol_amount;
  });
  if (fetchedData.length === 0) {
    return Array(5).fill(0);
  }
  const allConditionAvg = conditionsSum.map((data) => (data / fetchedData.length).toFixed(1));
  return allConditionAvg;
}
