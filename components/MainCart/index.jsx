import { useState } from "react";
import getVariants from "../../src/lib/getVariants";
import CartInfo from "../Cart/CartInfo";
import CartProduct from "../Cart/Product";
import CartStepper from "../CartStepper";

const MainCart = ({ data }) => {
  const [lineItems, setLineItems] = useState(
    getVariants(data.included, "line_item")
  );
  const [subtotalAttributes, setSubtotalAttributes] = useState(
    data.data.attributes || {}
  );

  const onHandleDelete = (data, subtotal) => {
    let newLineItems = lineItems.filter((el) => el.id !== data.id);
    setLineItems(newLineItems);
    console.log(subtotal);
    setSubtotalAttributes(subtotal.data.attributes);
  };

  return (
    <div className="w-full">
      <div className="w-full py-20">
        <CartStepper />
      </div>
      <div className="w-11/12 mx-auto">
        <div className="w-full space-y-4">
          {lineItems.map((line_item, i) => (
            <CartProduct
              handleDelete={onHandleDelete}
              data={line_item}
              key={i}
            />
          ))}
        </div>
        <CartInfo data={subtotalAttributes} />
      </div>
    </div>
  );
};

export default MainCart;
