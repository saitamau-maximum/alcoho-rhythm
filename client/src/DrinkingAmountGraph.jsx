import React, { useState, useEffect } from 'react';
import { countDrinkingAmount } from './countDrinkingAmount';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '飲酒量',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  // APIからデータを取得して、飲酒量を集計
  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/api/recordsTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: '2024-11-01T00:00:00Z',
        end: '2024-11-31T23:59:59Z',
      }),
      credentials: 'include', // Cookieを送信
    });

    const fetchedData = await response.json();
    console.log(fetchedData);

    // 日付ごとの飲酒量を取得
    const drinkingAmountPerDay = countDrinkingAmount(fetchedData);

    console.log(drinkingAmountPerDay);

    // 1〜31の日付をラベルとして設定
    const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    // グラフデータの更新
    setData({
      labels: labels,
      datasets: [
        {
          label: '飲酒量',
          data: drinkingAmountPerDay,
          backgroundColor: 'rgba(98, 193, 227, 1)',
          borderWidth: 1,
        },
      ],
    });
  };
  //マウント時にデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '飲酒量データ',
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Dashboard;
