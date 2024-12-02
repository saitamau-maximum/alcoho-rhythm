import { CONDITION_COLORS } from "../constant/color";

export const countDrinkingAmount = (drinkingDataForMonth, daysInMonth) => {
  // 各日付に対応する飲酒データを格納する初期配列
  const drinkingAmounts = new Array(daysInMonth).fill(null).map(() => []);

  // 日付ごとに飲酒量と色を分類
  drinkingDataForMonth.forEach((data) => {
    const date = new Date(data.date * 1000);
    const day = date.getDate() - 1; // 0インデックス化
    drinkingAmounts[day].push({
      amount: data.alcohol_amount,
      color: CONDITION_COLORS[data.condition - 1], // conditionに応じた色
    });
  });

  return drinkingAmounts;
};
