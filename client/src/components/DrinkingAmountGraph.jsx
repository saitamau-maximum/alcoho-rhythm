import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { countDrinkingAmount } from "../countDrinkingAmount";
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
    datasets: [
      {
        label: "飲酒量",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const drinkingAmountPerDay = countDrinkingAmount(fetchedData, daysInMonth);
    // 1〜31の日付をラベルとして設定
    const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    // グラフデータの更新
    setData({
      labels: labels,
      datasets: [
        {
          label: "飲酒量",
          data: drinkingAmountPerDay,
          backgroundColor: "rgba(98, 193, 227, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [fetchedData, daysInMonth]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "飲酒量データ",
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
