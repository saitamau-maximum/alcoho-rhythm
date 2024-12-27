import { useEffect, useState } from "react";
import { calcPureAlcoholQuantityAvg } from "../../utils/calcPureAlcoholQuantityAvg";
import PropTypes from "prop-types";
import styles from "./PureAlcoholQuantity.module.css";

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
    <div className={styles.pureAlcoholQuantityContainer}>
      <p>純アルコール量</p>
      <div className={styles.pureAlcoholQuantity}>
        <div>
          <div className={styles.top}>
            {pureAlcoholQuantity.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
          <div className={styles.bottom}>
            <div>良</div>
            <div className={styles.arrowContainer}>
              <div className={styles.arrowLine}></div>
            </div>
            <div>悪</div>
          </div>
          <div style={{margin: "0 auto", width: "45px", fontSize: "20px"}}>体調</div>
        </div>
      </div>
    </div>
  );
}

export default PureAlcoholQuantity;
