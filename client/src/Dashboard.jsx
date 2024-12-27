import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import DrinkingAmountGraph from "./components/DrinkingAmountGraph/DrinkingAmountGraph";
import ConditionAvg from "./components/ConditionAvg/ConditionAvg";
import ConditionDist from "./components/ConditionDist/ConditionDist";
import DrinkingState from "./components/DrinkingState/DrinkingState";
import LimitDrinkingAmountCalc from "./components/LimitDrinkingAmountCalc/LimitDrinkingAmountCalc";
import PureAlcoholQuantity from "./components/PureAlcoholQuantity/PureAlcoholQuantity";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth()).padStart(2, "0");

  const [displayYear, setDisplayYear] = useState(nowYear);
  const [displayMonth, setDisplayMonth] = useState(nowMonth);
  const [fetchedData, setFetchedData] = useState([]);

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate(); //monthは0-indexedであるため。dayが0は前月を表すらしい。

  useEffect(() => {
    // 認証されていない場合はサインインページにリダイレクト
    if (!isLoading && !isAuthenticated) {
      navigate("/signin");
    }

    const fetchData = async () => {
      const startDate = `${displayYear}-${String(Number(displayMonth) + 1).padStart(2, "0")}-01`;
      const endDate = `${displayYear}-${String(Number(displayMonth) + 1).padStart(2, "0")}-${daysInMonth}`;
      const url = `http://localhost:8000/api/records?start=${startDate}&end=${endDate}`;

      const response = await fetch(url, {
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
    fetchData();
  }, [
    displayYear,
    displayMonth,
    daysInMonth,
    isLoading,
    isAuthenticated,
    navigate,
  ]);

  // 読み込み中または未認証の場合はダッシュボードを表示しない
  if (isLoading || !isAuthenticated) {
    return null;
  }

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
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.month}>{displayMonth}月</span>
        <button onClick={preMonth} className={styles.triangleRight}></button>
        <span className={styles.month}>{`${displayYear}年${Number(displayMonth) + 1}月の体調データ`}</span>
        <button onClick={nextMonth} className={styles.triangleLeft}></button>
        <span className={styles.month}>
          {Number(displayMonth) + 2 === 13 ? 1 : Number(displayMonth) + 2}月
        </span>
      </div>
      {Array.isArray(fetchedData) ? (
        <div className={styles.dataContainer}>
          <div className={styles.drinkingDataContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.leftTopContainer}>
                <ConditionAvg fetchedData={fetchedData}/>
                <DrinkingState fetchedData={fetchedData} />
              </div>
              <DrinkingAmountGraph
                fetchedData={fetchedData}
                daysInMonth={daysInMonth}
              />
            </div>
            <div className={styles.rightContainer}>
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
