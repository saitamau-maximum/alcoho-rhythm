export const countDrinkingAmount = (drinkingDataForMonth = [], daysInMonth) => {
  // 色を5種類用意（サイクルする形で使用）
  const colors = [
    "rgba(98, 193, 227, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  // 各日の飲酒量を色ごとに積み上げるための配列
  const drinkingAmounts = new Array(daysInMonth).fill(0).map(() => []);

  // fetchedDataの各項目に対して、対応する日付の飲酒量を積み上げる
  drinkingDataForMonth.forEach((data) => {
    const date = new Date(data.date * 1000); // UNIX timestampを日付に変換
    const day = date.getDate() - 1; // 0インデックスにする
    const amount = data.alcohol_amount;

    // 色のインデックスを決定（色は順番にサイクル）
    const colorIndex = drinkingAmounts[day].length % colors.length;

    // 飲酒量と色の情報をまとめて配列に追加
    drinkingAmounts[day].push({
      amount: amount,
      color: colors[colorIndex],
    });
  });

  return drinkingAmounts;
};
