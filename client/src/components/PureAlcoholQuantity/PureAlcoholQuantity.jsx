import { useEffect, useState } from "react";
import { calcPureAlcoholQuantityAvg } from "../../utils/calcPureAlcoholQuantityAvg";
import PropTypes from "prop-types";
import "./PureAlcoholQuantity.css";

PureAlcoholQuantity.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function PureAlcoholQuantity({ fetchedData }) {
  const [pureAlcoholQuantity, setPureAlcoholQuantity] = useState([]);
  useEffect(() => {
    setPureAlcoholQuantity(calcPureAlcoholQuantityAvg(fetchedData));
  }, [fetchedData]);
  console.log(pureAlcoholQuantity);
  return (
    <div className="pure-alcohol-quantity-container">
      <h3>純アルコール量</h3>
      <div className="pure-alcohol-quantity-2">
        {pureAlcoholQuantity.map((item, index) => (
          <span key={index} style={{ margin: "20px" }}>
            {item}
          </span>
        ))}
        {/* この下は一時的に見やすいようにしてるだけ */}
        <span style={{ display: "block" }}></span>
        <span>悪い</span>
        <span className="yajirushi">←-------------------------→</span>
        <span>良い</span>
      </div>
    </div>
  );
}

export default PureAlcoholQuantity;
