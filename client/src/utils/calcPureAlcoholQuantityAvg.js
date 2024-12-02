export const calcPureAlcoholQuantityAvg = (fetchedData) => {
  const conditionsSum = [0, 0, 0, 0, 0];
  const conditionsCounts = [0, 0, 0, 0, 0];
  fetchedData.forEach((data) => {
    conditionsSum[data.condition - 1] += data.alcohol_amount;
    conditionsCounts[data.condition - 1]++;
  });
  if (fetchedData.length === 0) {
    return Array(5).fill(0);
  }
  const allConditionAvg = conditionsSum.map((data, index) =>
    (data / conditionsCounts[index] || 0).toFixed(1),
  );
  return allConditionAvg;
};
