import './register.css';

function Register() {
  return (
    <div>
      {/*日付登録 */}
      <div className="date-register">
        <h2>日付登録</h2>
        <label>飲酒した日付を選択してください</label>
        <input type="date" />
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
        {/* 体調を5段階で選択 */}
        <label>体調を５段階評価してください</label>
        <div className="condition-rating">
          <span>良い</span>
          <div className="condition-buttons">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
          </div>
          <span>悪い</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
