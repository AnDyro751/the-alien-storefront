import Link from "next/link";
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
    setSubtotalAttributes(subtotal.data.attributes || {});
  };

  const onHandleUpdate = (data) => {
    setSubtotalAttributes(data.data.attributes || {});
  };

  if (lineItems.length <= 0) {
    return (
      <div className="h-screen w-11/12 flex-wrap mx-auto flex items-center justify-center">
        <div className="w-full relative flex-wrap mx-auto flex items-center justify-center ">
          <div className="w-full text-center">
            <h1 className="text-4xl w-full font-medium">
              Tu carrito está vacío
            </h1>
          </div>
          <div className="flex mt-12">
            <Link href={`/products`}>
              <a className="bg-black hover:bg-gray-800 transition duration-200 text-white rounded py-3 px-8 focus:outline-none">
                Explorar productos
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full py-20">
        <CartStepper />
      </div>
      <div className="w-11/12 mx-auto">
        <div className="w-full space-y-4">
          {lineItems.map((line_item, i) => (
            <CartProduct
              handleUpdate={onHandleUpdate}
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
