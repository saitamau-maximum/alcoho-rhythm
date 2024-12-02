import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./register.css";

function Register() {
  // 状態管理
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateValid, setIsDateValid] = useState(false);
  const [conditionError, setConditionError] = useState(false);

  // エラーメッセージの状態を追加
  const [errorMessage, setErrorMessage] = useState("");

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

  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // 今日の日付を取得してフォーマットする関数
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // 日付が選択されたときの処理
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // バリデーション
    const minDate = new Date("2000-01-01");
    const maxDate = new Date(getTodayDate());
    const selected = new Date(date);

    if (selected >= minDate && selected <= maxDate) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };

  // 体調ボタンがクリックされたときの処理
  const handleConditionClick = (value) => {
    setSelectedCondition(value);
    setConditionError(false);
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

  // 登録ボタンのクリック処理
  const handleSubmit = () => {
    if (isDateValid && selectedCondition !== null) {
      const totalAlcoholAmount = computeTotalAlcohol();

      const data = {
        date: selectedDate,
        amount: totalAlcoholAmount,
        condition: selectedCondition,
      };

      fetch("http://localhost:8000/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            // サーバーからのエラーメッセージを取得
            return response.json().then((data) => {
              throw new Error(data.message || "データの送信に失敗しました");
            });
          }
          // エラーメッセージをクリア
          setErrorMessage("");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.message);
        });
    }
  };

  // ボタンの無効化
  const isButtonDisabled = !isDateValid || selectedCondition === null;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="register-container">
      {/* 日付登録 */}
      <div className="date-register">
        <h2>日付登録</h2>
        <label>飲酒した日付を選択してください</label>
        <input
          type="date"
          min="2000-01-01"
          max={getTodayDate()}
          value={selectedDate}
          onChange={handleDateChange}
        />
        {!isDateValid && (
          <p className="error-message">
            2000年1月1日から今日までの日付を選択できます。
          </p>
        )}
      </div>

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

      {/* 体調の登録 */}
      <div className="condition-register">
        <h2>体調の登録</h2>
        <label>体調を５段階から選択</label>
        <div className="condition-buttons">
          <span>良い</span>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={selectedCondition === value ? "active" : ""}
              onClick={() => handleConditionClick(value)}
            >
              {value}
            </button>
          ))}
          <span>悪い</span>
        </div>

        {conditionError && (
          <p className="error-message">体調を選択してください。</p>
        )}
      </div>

      {/* エラーメッセージを表示 */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* 登録ボタン */}
      <div className="submit-button">
        <button onClick={handleSubmit} disabled={isButtonDisabled}>
          登録
        </button>
      </div>
    </div>
  );
}

export default Register;
