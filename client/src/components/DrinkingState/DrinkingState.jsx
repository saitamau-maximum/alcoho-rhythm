import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { animator } from "chart.js";

DrinkingCount.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function DrinkingCount({ fetchedData }) {
  const [drinkingCount, setDrinkingCount] = useState(0);
  const [healthyDrinkingRate, setHealthyDrinkingRate] = useState(0);

  useEffect(() => {
    const healthyDrinkingNum = fetchedData.filter(
      (data) => data.condition <= 3,
    ).length;
    setHealthyDrinkingRate(
      ((healthyDrinkingNum / fetchedData.length) * 100 || 0).toFixed(0),
    );
    setDrinkingCount(fetchedData.length);
  }, [fetchedData]);
  return (
    <div>
      <div>飲酒回数: {drinkingCount}</div>
      <div>健康飲酒率: {healthyDrinkingRate}%</div>
    </div>
  );
}

export default DrinkingCount;
