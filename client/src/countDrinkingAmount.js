export const countDrinkingAmount = (drinkingDataForMonth, daysInMonth) => {
  // TODO: すべての月が31日になってしまうため月ごとに変更する
  const drinkingAmounts = new Array(daysInMonth).fill(0);

  // 全データから日付ごとの飲酒量をカウント
  drinkingDataForMonth.forEach((data) => {
    const date = new Date(data.date * 1000);
    const day = date.getDate() - 1; //0インデックスにする
    const amount = data.alcohol_amount;
    drinkingAmounts[day] += amount;
  });

  return drinkingAmounts;
};
