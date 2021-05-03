import { useEffect, useState } from "react";
import ProductAddToCart from "../products/AddToCart";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
const SelectProductQuantity = ({ product, variant = {} }) => {
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
          <label htmlFor="add_quantity" className="hidden invisible">
            add quantity
          </label>
          <input
            onChange={handleChange}
            type="number"
            id="add_quantity"
            value={quantity}
            className="px-4 h-12 w-full py-3 bg-gray-200 rounded shadow text-center appearance-none"
          />
        </div>
        <div className="w-1/2">
          <ProductAddToCart
            quantity={quantity}
            disabled={isEmpty(variant) ? true : !variant.purchasable}
            variant={variant}
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
