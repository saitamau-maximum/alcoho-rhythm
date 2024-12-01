import { useEffect, useState } from "react";
import DrinkingAmountGraph from "./components/DrinkingAmountGraph";
import ConditionAvg from "./components/ConditionAvg";
import ConditionDist from "./components/ConditionDist";
import DrinkingCount from "./components/DrinkingCount";

function Dashboard() {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth()).padStart(2, "0");
  const [displayYear, setDisplayYear] = useState(nowYear);
  const [displayMonth, setDisplayMonth] = useState(nowMonth);
  const [fetchedData, setFetchedData] = useState([]);
  const daysInMonth = new Date(displayYear, displayMonth+1, 0).getDate(); //monthは0-indexedであるため。dayが0は前月を表すらしい。

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/recordsTmp", {
      //TODO: エンドポイント名を修正する
      method: "POST", //実際はGET
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: `${displayYear}-${String(Number(displayMonth)+1)}-01`,
        end: `${displayYear}-${String(Number(displayMonth)+1)}-${daysInMonth}`,
      }),
      credentials: "include", // Cookieを送信
    });
    const data = await response.json();
    if (response.ok) {
      //fetchしたデータを更新
      setFetchedData(data);
    } else {
      console.log("failed to fetch data.");
      setFetchedData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [displayYear, displayMonth]);

  const nextMonth = () => {
    const nextDate = new Date(displayYear, displayMonth + 1);
    const nextMonthYear = nextDate.getFullYear();
    const nextMonth = nextDate.getMonth();
    if (nextMonthYear <= nowYear) {
      setDisplayYear(nextMonthYear);
      setDisplayMonth(nextMonth);
    } else {
      alert("これ以上進めません");
    }
  };

  const preMonth = () => {
    const preDate = new Date(displayYear, displayMonth - 1);
    const preMonthYear = preDate.getFullYear();
    const preMonth = preDate.getMonth();
    if (preMonthYear > 2000) {
      setDisplayYear(preMonthYear);
      setDisplayMonth(preMonth);
    } else {
      alert("これ以上戻れません");
    }
  };

  return (
    <div>
      <div>
        <button onClick={preMonth}>◀</button>
        {`${displayYear}年${String(Number(displayMonth)+1)}月の体調データ`}
        <button onClick={nextMonth}>▶</button>
      </div>
      {Array.isArray(fetchedData) ? (
      <div>
        <DrinkingAmountGraph
          fetchedData={fetchedData}
          daysInMonth={daysInMonth}
        />
        <DrinkingCount fetchedData={fetchedData} />
        <ConditionAvg fetchedData={fetchedData} />
        <ConditionDist fetchedData={fetchedData} />
      </div>
      ) : (
        <p>データ取得に失敗しました。</p>
      )}
    </div>
  );
}

export default Dashboard;
