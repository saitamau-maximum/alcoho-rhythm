import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { countDrinkingAmount } from "../utils/countDrinkingAmount";
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
    const drinkingAmountPerDay = countDrinkingAmount(fetchedData, daysInMonth);
    // 1〜31の日付をラベルとして設定
    const labels = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString(),
    );

    // グラフデータの更新
    const datasets = [];
    drinkingAmountPerDay.forEach((dayData, dayIndex) => {
      dayData.forEach((dataItem, index) => {
        // 同じ日に複数のデータがある場合は、それぞれ色ごとに積む
        if (!datasets[index]) {
          datasets[index] = {
            data: new Array(daysInMonth).fill(0),
            backgroundColor: dataItem.color,
            borderWidth: 1,
          };
        }
        datasets[index].data[dayIndex] = dataItem.amount;
      });
    });

    setData({
      labels: labels,
      datasets: datasets,
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
        stacked: true, // x軸で積み重ねを有効にする
      },
      y: {
        stacked: true, // y軸で積み重ねを有効にする
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
