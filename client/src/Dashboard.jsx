import { useEffect, useState } from "react";
import DrinkingAmountGraph from "./components/DrinkingAmountGraph";
import ConditionAvg from "./components/ConditionAvg";
import ConditionDist from "./components/ConditionDist";
import DrinkingCount from "./components/DrinkingCount";

function Dashboard() {
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/recordsTmp", {
      method: "POST",//実際はGET
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: "2024-11-01T00:00:00Z",
        end: "2024-11-31T23:59:59Z",
      }),
      credentials: "include", // Cookieを送信
    });
    const data = await response.json();
    //fetchしたデータを更新
    setFetchedData(data);
  };

  //マウント時に実行
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <DrinkingAmountGraph fetchedData={fetchedData} month={month}/>
      <DrinkingCount fetchedData={fetchedData} />
      <ConditionAvg fetchedData={fetchedData} />
      <ConditionDist fetchedData={fetchedData}/>
    </div>
  );
}

export default Dashboard;
