import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DrinkingState.css";

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
      (data) => data.condition <= 2,
    ).length;
    setHealthyDrinkingRate(
      ((healthyDrinkingNum / fetchedData.length) * 100 || 0).toFixed(0),
    );
    setDrinkingCount(fetchedData.length);
  }, [fetchedData]);
  return (
    <div className="drinking-state-container">
      <div className="drinking-count-container">
        <h1>飲酒回数</h1>
        <p>
          <span>{drinkingCount}</span>回
        </p>
      </div>
      <div className="healthy-drinking-rate-container">
        <h1>健康飲酒率</h1>
        <p>
          <span>{healthyDrinkingRate}</span>%
        </p>
      </div>
    </div>
  );
}

export default DrinkingCount;
