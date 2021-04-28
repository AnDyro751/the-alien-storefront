import { useState } from "react";
import ProductAddToCart from "../products/AddToCart";
import { useTranslation } from "next-i18next";

const SelectProductQuantity = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation("common");

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value || 1) || 1);
  };
  return (
    <>
      <div className="w-full mb-2">
        <label htmlFor="product_quantity" className="text-sm text-gray-700">
          {t("texts.quantity")}
        </label>
      </div>
      <div className="w-full flex items-center space-x-4">
        <div className="w-1/2">
          <input
            onChange={handleChange}
            type="number"
            value={quantity}
            className="px-4 h-12 w-full py-3 bg-gray-200 rounded shadow text-center appearance-none"
          />
        </div>
        <div className="w-1/2">
          <ProductAddToCart
            text={t("texts.add_to_cart")}
            className="w-full"
            product={product}
          />
        </div>
      </div>
    </>
  );
};

export default SelectProductQuantity;
