import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
const SelectProductOptionTypes = ({ optionTypes }) => {
  if (isEmpty(optionTypes)) {
    return null;
  } else {
    return (
      <div className="w-full">
        {optionTypes.map((optionType, i) => (
          <div key={i} className="w-full">
            {optionType.attributes?.name}
          </div>
        ))}
      </div>
    );
  }
};

SelectProductOptionTypes.propTypes = {
  optionTypes: PropTypes.array.isRequired,
};

export default SelectProductOptionTypes;
