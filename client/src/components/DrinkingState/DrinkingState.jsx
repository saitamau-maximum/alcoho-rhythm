import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./DrinkingState.module.css";

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
    <div className={styles.drinkingStateContainer}>
      <div className={styles.drinkingCountContainer}>
        <h1>飲酒回数</h1>
        <div>
          <span>{drinkingCount}</span><p>回</p>
        </div>
      </div>
      <div className={styles.healthyDrinkingRateContainer}>
        <h1>健康飲酒率</h1>
        <div>
          <span>{healthyDrinkingRate}</span><p>%</p>
        </div>
      </div>
    </div>
  );
}

export default DrinkingCount;
