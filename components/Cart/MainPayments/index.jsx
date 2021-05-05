import PropTypes from "prop-types";
import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IX9BNFtFW4yYd5sdzOwy9m0vituic2Yi3Jed5C1uDYxjtzk5LxXtkbIKPnIGd3KToeEjYi2g4jMSLLpq3M6REqh00KGiW6AWB"
);
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

const StripeElements = () => {
  return <h2>Stripe</h2>;
};

// {"authenticity_token"=>"[FILTERED]", "order"=>{"state_lock_version"=>"9", "payments_attributes"=>[{"payment_method_id"=>"3"}]}, "payment_source"=>{"3"=>{"name"=>"Angel Mendez", "gateway_payment_profile_id"=>"tok_1InYZ4FtFW4yYd5sT0trKpOx", "number"=>"[FILTERED]", "month"=>"4", "year"=>"2024"}}, "locale"=>nil, "state"=>"payment"}
MainPayments.propTypes = {
  data: PropTypes.array.isRequired,
};

MainPayments.defaultProps = {
  data: [],
};
export default MainPayments;
