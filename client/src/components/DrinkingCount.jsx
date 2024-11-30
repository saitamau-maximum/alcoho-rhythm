import React, { useEffect, useState } from 'react'

function DrinkingCount({ fetchedData }) {
  const [drinkingCount, setDrinkingCount] = useState(0);
  useEffect(() => {
    setDrinkingCount(fetchedData.length);
  }, [fetchedData]);
  return (
    <div>飲酒回数: {drinkingCount}</div>
  )
}

export default DrinkingCount;
