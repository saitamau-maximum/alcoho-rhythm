import { useEffect, useState } from "react";
import DrinkingAmountGraph from "./components/DrinkingAmountGraph/DrinkingAmountGraph";
import ConditionAvg from "./components/ConditionAvg/ConditionAvg";
import ConditionDist from "./components/ConditionDist/ConditionDist";
import DrinkingState from "./components/DrinkingState/DrinkingState";
import LimitDrinkingAmountCalc from "./components/LimitDrinkingAmountCalc/LimitDrinkingAmountCalc";
import PureAlcoholQuantity from "./components/PureAlcoholQuantity/PureAlcoholQuantity";
import "./Dashboard.css";

function Dashboard() {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth()).padStart(2, "0");
  const [displayYear, setDisplayYear] = useState(nowYear);
  const [displayMonth, setDisplayMonth] = useState(nowMonth);
  const [fetchedData, setFetchedData] = useState([]);
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate(); //monthは0-indexedであるため。dayが0は前月を表すらしい。

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/records?start=${displayYear}-${String(Number(displayMonth) + 1)}-01&end=${displayYear}-${String(Number(displayMonth) + 1)}-${daysInMonth}`,
        {
          credentials: "include", // Cookieを送信
        },
      );
      const data = await response.json();
      if (response.ok) {
        //fetchしたデータを更新
        setFetchedData(data);
      } else {
        console.log("failed to fetch data.");
        setFetchedData(null);
      }
    };
    fetchData();
  }, [displayYear, displayMonth, daysInMonth]);

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

  console.log(fetchedData);

  return (
    <div>
      <div>
        {displayMonth}月<button onClick={preMonth}>◀</button>
        {`${displayYear}年${Number(displayMonth) + 1}月の体調データ`}
        <button onClick={nextMonth}>▶</button>
        {Number(displayMonth) + 2 === 13 ? 1 : Number(displayMonth) + 2}月
      </div>
      {Array.isArray(fetchedData) ? (
        <div className="container">
          <div className="drinking-data-container">
            <div className="left-container">
              <div className="left-top-container">
                <ConditionAvg fetchedData={fetchedData} />
                <DrinkingState fetchedData={fetchedData} />
              </div>
              <DrinkingAmountGraph
                fetchedData={fetchedData}
                daysInMonth={daysInMonth}
              />
            </div>
            <div>
              <ConditionDist fetchedData={fetchedData} />
              <PureAlcoholQuantity fetchedData={fetchedData} />
            </div>
          </div>
          <LimitDrinkingAmountCalc />
        </div>
      ) : (
        <p>データ取得に失敗しました。</p>
      )}
    </div>
  );
}

export default Dashboard;
