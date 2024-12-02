import React, { useEffect } from 'react'
import PropTypes from "prop-types";

PureAlcoholQuantity.propTypes = {
  fetchedData: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

function PureAlcoholQuantity({ fetchedData }) {
  useEffect(() => {

  }, [fetchedData]);
  return (
    <div>
      <h3>純アルコール量</h3>
      <div>

      </div>
    </div>
  )
}

export default PureAlcoholQuantity
