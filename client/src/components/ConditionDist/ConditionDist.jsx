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
import styles from "./ConditionDist.module.css";

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
    mainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <p>体調分布</p>
      <div className={styles.graph}>
      {fetchedData.length !== 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>データがありません</p>
      )}
      </div>
    </div>
  );
}

export default ConditionDist;
