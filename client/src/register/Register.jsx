import './register.css';
import { useState } from 'react';

function Register() {
  // 選択された体調評価を追跡するための状態管理
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleConditionClick = (value) => {
    setSelectedCondition(value);
  };

  // 今日の日付を取得してフォーマット
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1する
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div>
      {/* 日付登録 */}
      <div className="date-register">
        <h2>日付登録</h2>
        <label>飲酒した日付を選択してください</label>
        <input
          type="date"
          min="2000-01-01"  // 最小日付を2000年1月1日として設定
          max={getTodayDate()}  // 今日の日付までしか選べないように設定
        />
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
              <td><input type="number" min="0" /> 缶</td>
            </tr>
            <tr>
              <td>
                ビール・発泡酒・チューハイなど
                <br />
                <small>※1缶＝500mlとして</small>
              </td>
              <td>5%</td>
              <td><input type="number" min="0" /> 缶</td>
            </tr>
            <tr>
              <td>
                ハイボールなど
                <br />
                <small>※1缶＝350mlとして</small>
              </td>
              <td>7%</td>
              <td><input type="number" min="0" /> 缶</td>
            </tr>
            <tr>
              <td>
                ハイボールなど
                <br />
                <small>※1缶＝500mlとして</small>
              </td>
              <td>7%</td>
              <td><input type="number" min="0" /> 缶</td>
            </tr>
            <tr>
              <td>
                ワインなど
                <br />
                <small>※1杯＝120mlとして</small>
              </td>
              <td>12%</td>
              <td><input type="number" min="0" /> 杯</td>
            </tr>
            <tr>
              <td>
                清酒など
                <br />
                <small>※1合＝180mlとして</small>
              </td>
              <td>15%</td>
              <td><input type="number" min="0" /> 合</td>
            </tr>
            <tr>
              <td>
                焼酎など
                <br />
                <small>※コップ1杯＝100mlとして</small>
              </td>
              <td>25%</td>
              <td><input type="number" min="0" /> 杯</td>
            </tr>
            <tr>
              <td>
                ウイスキー、ブランデーなど
                <br />
                <small>※シングル1杯＝30mlとして</small>
              </td>
              <td>40%</td>
              <td><input type="number" min="0" /> 杯</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 体調の登録 */}
      <div className="condition-register">
        <h2>体調の登録</h2>
        <label>体調を５段階から選択</label>
        <div className="condition-rating">
          <span>良い</span>
          <div className="condition-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={selectedCondition === value ? 'active' : ''}
                onClick={() => handleConditionClick(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <span>悪い</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
