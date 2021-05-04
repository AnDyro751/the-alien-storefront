import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SelectShippingRate = ({ shippingRates }) => {
  const [currentShippingRates, setCurrentShippingRates] = useState(
    shippingRates
  );
  useEffect(() => {
    setCurrentShippingRates(shippingRates);
  }, [shippingRates]);

  return (
    <div className="w-full mt-8 rounded-md shadow-lg bg-white p-4 md:p-8">
      <h3 className="text-2xl font-medium">Select shipping rate</h3>
      {currentShippingRates.length <= 0 && (
        <h4 className="mt-2 text-sm text-gray-700">
          No hay métodos de envío disponible para la dirección proporcionada
        </h4>
      )}
      {currentShippingRates.map((shippingRate, i) => (
        <div className="w-full" key={i}>
          {shippingRate.attributes?.name}
        </div>
      ))}
    </div>
  );
};

SelectShippingRate.propTypes = {
  shippingRates: PropTypes.array.isRequired,
};

SelectShippingRate.defaultProps = {
  shippingRates: [],
};

export default SelectShippingRate;
