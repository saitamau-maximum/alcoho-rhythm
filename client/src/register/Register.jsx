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
        <table>
          <thead>
            <tr>
              <th>お酒の種類</th>
              <th>数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ビール</td>
              <td><input type="number" placeholder="数量を入力" name="beer" /></td>
            </tr>
            <tr>
              <td>ハイボール</td>
              <td><input type="number" placeholder="数量を入力" name="highball" /></td>
            </tr>
            <tr>
              <td>日本酒</td>
              <td><input type="number" placeholder="数量を入力" name="sake" /></td>
            </tr>
            <tr>
              <td>焼酎</td>
              <td><input type="number" placeholder="数量を入力" name="shochu" /></td>
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
