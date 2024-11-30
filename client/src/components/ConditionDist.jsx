import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Chart.js のプラグインを登録
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function ConditionDist({ fetchedData }) {
  const [data, setData] = useState({
    labels: [1, 2, 3, 4, 5], // ラベル
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "green", "blue"], //TODO: デザインの色に変更する
      },
    ],
  });

  useEffect(() => {
    const conditionsData = [0, 0, 0, 0, 0];
    console.log(fetchedData);
    fetchedData.forEach((data) => {
      conditionsData[data.condition - 1]++; //0インデックスにする
    });
    setData({
      labels: [1, 2, 3, 4, 5], // ラベル
      datasets: [
        {
          data: conditionsData,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "green", "blue"],
        },
      ],
    });
    console.log(conditionsData);
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
      <Pie data={data} options={options} />
    </div>
  );
}

export default ConditionDist;
