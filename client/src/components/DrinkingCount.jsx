import { useEffect, useState } from "react";
import PropTypes from "prop-types";

DrinkingCount.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function DrinkingCount({ fetchedData }) {
  const [drinkingCount, setDrinkingCount] = useState(0);
  useEffect(() => {
    setDrinkingCount(fetchedData.length);
  }, [fetchedData]);
  return (
    <div>飲酒回数: {drinkingCount}</div>
  );
}

export default DrinkingCount;
