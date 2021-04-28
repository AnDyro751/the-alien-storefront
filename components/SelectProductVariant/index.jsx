import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
const SelectProductVariant = ({ variants, handleSelectVariant }) => {
  const [currentVariant, setCurrentVariant] = useState(variants[0]);

  useEffect(() => {
    // setCurrentVariant(variants[0]);
    handleSelectVariant(variants[0]);
  }, []);

  const onHandleClick = (variant) => {
    setCurrentVariant(variant);
    handleSelectVariant(variant);
  };

  if (variants.length <= 0) {
    return null;
  }
  return (
    <div className="w-full space-y-3 mb-4">
      <p className="text-sm text-gray-600">Selecciona una variante</p>
      {variants.map((variant, i) => (
        <Variant
          variant={variant}
          key={i}
          handleClick={onHandleClick}
          current={currentVariant.id === variant.id}
        />
      ))}
    </div>
  );
};

const Variant = ({ variant, current = false, handleClick }) => {
  return (
    <button
      onClick={() => {
        handleClick(variant);
      }}
      className={`w-full text-left px-3 py-3 border-2 bg-gray-100 rounded focus:outline-none ${
        current ? "border-black" : "border-transparent"
      }`}
    >
      {variant.attributes?.options_text}
    </button>
  );
};

SelectProductVariant.propTypes = {
  variants: PropTypes.array.isRequired,
};

export default SelectProductVariant;
