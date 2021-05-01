/**
 * Copyright (c) 2021 Angel Mendez - Anture
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import PropTypes from "prop-types";
const CartInfo = ({ data }) => {
  console.log("DAAA", data);
  return (
    <div className="w-full text-right mt-10">
      <h3 className="text-2xl text-gray-900 font-medium">Subtotal:</h3>
      <h4 className="mt-2 text-gray-700" >
        <span>{data.display_total} {data.currency}</span>
      </h4>
    </div>
  );
};

CartInfo.propTypes = {
  data: PropTypes.object.isRequired,
};
CartInfo.defaultProps = {
  data: {},
};

export default CartInfo;
