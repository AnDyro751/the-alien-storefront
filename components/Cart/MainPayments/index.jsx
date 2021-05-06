import PropTypes from "prop-types";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import StripeElements from "../../StripeElements";

const MainPayments = ({ data }) => {
  const [currentPaymentMethod, setPaymentMethod] = useState({});

  const handleSelect = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  return (
    <div className="w-full p-4 rounded bg-white shadow-lg">
      <h3 className="text-2xl font-medium my-4">Select Payment Method</h3>
      {data.map((paymentMethod, i) => (
        <div
          className="w-full"
          onClick={() => handleSelect(paymentMethod)}
          key={i}
        >
          {paymentMethod.attributes?.type}
        </div>
      ))}
      {!isEmpty(currentPaymentMethod) &&
        currentPaymentMethod.attributes?.type ===
          "Spree::Gateway::StripeElementsGateway" && <StripeElements />}
    </div>
  );
};

MainPayments.propTypes = {
  data: PropTypes.array.isRequired,
};

MainPayments.defaultProps = {
  data: [],
};
export default MainPayments;
