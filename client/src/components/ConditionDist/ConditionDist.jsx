import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { CONDITION_COLORS } from "../../constant/color";

// Chart.js のプラグインを登録
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

ConditionDist.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function ConditionDist({ fetchedData }) {
  const [data, setData] = useState({
    labels: [1, 2, 3, 4, 5], // ラベル
    datasets: [
      {
        data: [],
        backgroundColor: CONDITION_COLORS, //TODO: デザインの色に変更する
      },
    ],
  });

  useEffect(() => {
    const conditionsData = [0, 0, 0, 0, 0];
    fetchedData.forEach((data) => {
      conditionsData[data.condition - 1]++; //0インデックスにする
    });
    setData({
      labels: [1, 2, 3, 4, 5], // ラベル
      datasets: [
        {
          data: conditionsData,
          backgroundColor: CONDITION_COLORS,
        },
      ],
    });
  }, [fetchedData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h2>体調分布</h2>
      {fetchedData.length !== 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
}

export default ConditionDist;
