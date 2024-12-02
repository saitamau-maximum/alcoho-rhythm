import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { countDrinkingAmount } from "../../utils/countDrinkingAmount";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

DrinkingAmountGraph.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      alcohol_amount: PropTypes.number.isRequired,
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
  daysInMonth: PropTypes.number.isRequired,
};

function DrinkingAmountGraph({ fetchedData, daysInMonth }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // 日付ごとの飲酒データを取得
    const drinkingAmountPerDay = countDrinkingAmount(fetchedData, daysInMonth);

    // ラベルを1〜月末日まで作成
    const labels = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString(),
    );

    // グラフデータの生成
    const datasets = drinkingAmountPerDay.flatMap((dayData, dayIndex) =>
      dayData.map((dataItem) => ({
        label: `Day ${dayIndex + 1}`, // ラベルを日付ベースに設定
        data: labels.map((_, idx) => (idx === dayIndex ? dataItem.amount : 0)), // 該当日以外は0
        backgroundColor: dataItem.color, // conditionに基づいた色
        borderWidth: 1,
      })),
    );

    setData({
      labels,
      datasets,
    });
  }, [fetchedData, daysInMonth]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "飲酒量データ",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true, // X軸の積み上げ
      },
      y: {
        stacked: true, // Y軸の積み上げ
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DrinkingAmountGraph;
