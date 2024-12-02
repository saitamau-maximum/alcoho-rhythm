import { calcPureAlcoholQuantityAvg } from "../../utils/calcPureAlcoholQuantityAvg";
import "./LimitDrinkingAmountCalc.css";
import { useState } from "react";

function LimitDrinkingAmountCalc() {
  const [simulatedResults, setSimulatedResults] = useState({
    condition: 0,
    pureAlcoholQuantitiy: 0,
    drinkableQuantitiy: 0,
  });
  const [message, setMessage] = useState("");

  // アルコール数量の状態を管理するstate
  const [alcoholQuantities, setAlcoholQuantities] = useState({
    beer350: 0,
    beer500: 0,
    highball350: 0,
    highball500: 0,
    wine: 0,
    sake: 0,
    shochu: 0,
    whiskey: 0,
  });

  const fetchYearsData = async () => {
    const currentDate = new Date();
    const oneYearAgoDate = new Date(
      Number(currentDate.getFullYear() - 1),
      currentDate.getMonth(),
      currentDate.getDay(),
    );
    const currentDateISO = currentDate.toISOString().split("T")[0];
    const oneYearAgoDateISO = oneYearAgoDate.toISOString().split("T")[0];
    const response = await fetch(
      `http://localhost:8000/api/records?start=${oneYearAgoDateISO}&end=${currentDateISO}`,
      {
        credentials: "include", // Cookieを送信
      },
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("failed to fetch data");
    }
  };

  // アルコール量を計算する関数
  const computeTotalAlcohol = () => {
    const alcoholData = [
      { quantity: alcoholQuantities.beer350, volume: 350, percentage: 0.05 },
      { quantity: alcoholQuantities.beer500, volume: 500, percentage: 0.05 },
      {
        quantity: alcoholQuantities.highball350,
        volume: 350,
        percentage: 0.07,
      },
      {
        quantity: alcoholQuantities.highball500,
        volume: 500,
        percentage: 0.07,
      },
      { quantity: alcoholQuantities.wine, volume: 120, percentage: 0.12 },
      { quantity: alcoholQuantities.sake, volume: 180, percentage: 0.15 },
      { quantity: alcoholQuantities.shochu, volume: 100, percentage: 0.25 },
      { quantity: alcoholQuantities.whiskey, volume: 30, percentage: 0.4 },
    ];
    const total = alcoholData.reduce(
      (acc, { quantity, volume, percentage }) => {
        return acc + quantity * volume * percentage;
      },
      0,
    );
    return total;
  };

  const simulateCondition = async () => {
    if (!Object.values(alcoholQuantities).some((value) => value !== 0)) {
      setMessage("飲酒量を入力してください");
      return;
    } else {
      setMessage("");
    }

    const pastOneYearsData = await fetchYearsData();
    const pastOneYearsAlcoholQuantityAvg =
      calcPureAlcoholQuantityAvg(pastOneYearsData);

    const pureAlcoholQuantity = computeTotalAlcohol();
    //差が最小となる体調を探す
    const differences = pastOneYearsAlcoholQuantityAvg.map((value) =>
      Math.abs(value - pureAlcoholQuantity),
    );
    const simulatedCondition =
      differences.indexOf(Math.min(...differences)) + 1;

    const drinkableQuantitiy =
      pastOneYearsAlcoholQuantityAvg[1] - pureAlcoholQuantity;
    //データを更新
    setSimulatedResults({
      condition: simulatedCondition,
      pureAlcoholQuantitiy: pureAlcoholQuantity,
      drinkableQuantitiy: drinkableQuantitiy,
    });
  };

  return (
    <div className="register-container">
      {/* 酒の数量登録 */}
      <div className="alcohol-register">
        <h2>アルコール数量登録</h2>
        <table className="alcohol-table">
          <thead>
            <tr>
              <th>お酒</th>
              <th>アルコール度数</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                ビール・発泡酒・チューハイなど
                <br />
                <small>※1缶＝350mlとして</small>
              </td>
              <td>5%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.beer350}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      beer350: Number(e.target.value),
                    })
                  }
                />{" "}
                缶
              </td>
            </tr>
            <tr>
              <td>
                ビール・発泡酒・チューハイなど
                <br />
                <small>※1缶＝500mlとして</small>
              </td>
              <td>5%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.beer500}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      beer500: Number(e.target.value),
                    })
                  }
                />{" "}
                缶
              </td>
            </tr>
            <tr>
              <td>
                ハイボールなど
                <br />
                <small>※1缶＝350mlとして</small>
              </td>
              <td>7%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.highball350}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      highball350: Number(e.target.value),
                    })
                  }
                />{" "}
                缶
              </td>
            </tr>
            <tr>
              <td>
                ハイボールなど
                <br />
                <small>※1缶＝500mlとして</small>
              </td>
              <td>7%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.highball500}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      highball500: Number(e.target.value),
                    })
                  }
                />{" "}
                缶
              </td>
            </tr>
            <tr>
              <td>
                ワインなど
                <br />
                <small>※1杯＝120mlとして</small>
              </td>
              <td>12%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.wine}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      wine: Number(e.target.value),
                    })
                  }
                />{" "}
                杯
              </td>
            </tr>
            <tr>
              <td>
                清酒など
                <br />
                <small>※1合＝180mlとして</small>
              </td>
              <td>15%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.sake}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      sake: Number(e.target.value),
                    })
                  }
                />{" "}
                合
              </td>
            </tr>
            <tr>
              <td>
                焼酎など
                <br />
                <small>※コップ1杯＝100mlとして</small>
              </td>
              <td>25%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.shochu}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      shochu: Number(e.target.value),
                    })
                  }
                />{" "}
                杯
              </td>
            </tr>
            <tr>
              <td>
                ウイスキー、ブランデーなど
                <br />
                <small>※シングル1杯＝30mlとして</small>
              </td>
              <td>40%</td>
              <td>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={alcoholQuantities.whiskey}
                  onChange={(e) =>
                    setAlcoholQuantities({
                      ...alcoholQuantities,
                      whiskey: Number(e.target.value),
                    })
                  }
                />{" "}
                杯
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={simulateCondition}>判定結果を表示</button>
        {simulatedResults.condition !== 0 ? (
          <div className="simulatecondition-container">
            <div className="simulation-card">
              <span className="simulation-card-title">体調予測値:</span>{" "}
              <span className="simulation-card-data">
                {simulatedResults.condition}
              </span>
            </div>
            <div className="simulation-card">
              <span className="simulation-card-title">純アルコール量:</span>{" "}
              <span className="simulation-card-data">
                {simulatedResults.pureAlcoholQuantitiy}
              </span>
            </div>
            <div className="simulation-card">
              <span className="simulation-card-title">健康飲酒まで:</span>{" "}
              <span className="simulation-card-data">
                {simulatedResults.drinkableQuantitiy}
              </span>
            </div>
          </div>
        ) : (
          <div className="error-message">{message}</div>
        )}
      </div>
    </div>
  );
}

export default LimitDrinkingAmountCalc;
