import Link from "next/link";
import { useContext, useState } from "react";
import client from "../../src/client";
import { COOKIE_SPREE_ORDER } from "../../src/lib/apiConstants";
import getCookie from "../../src/lib/getCookie";
import getVariants from "../../src/lib/getVariants";
import showToast from "../../src/lib/showToast";
import { OrderContext } from "../../src/stores/useOrder";
import ComponentButton from "../Button";
import CartInfo from "../Cart/CartInfo";
import CartProduct from "../Cart/Product";
import CartStepper from "../CartStepper";
import Image from "next/image";
import EmptyRecords from "../EmptyRecords";
const MainCart = ({ data }) => {
  const [lineItems, setLineItems] = useState(
    getVariants(data.included, "line_item")
  );
  console.log(getVariants(data.included, "line_item"), "VARIANT")
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [subtotalAttributes, setSubtotalAttributes] = useState(
    data.data.attributes || {}
  );
  const { state, dispatch } = useContext(OrderContext);

  const onHandleDelete = (data, subtotal) => {
    let newLineItems = lineItems.filter((el) => el.id != data.id);
    setLineItems(newLineItems);
    console.log(newLineItems, "se elimina el", data.id);
    console.log(subtotal);
    setSubtotalAttributes(subtotal.data.attributes || {});
  };

  const onHandleUpdate = (data) => {
    setSubtotalAttributes(data.data.attributes || {});
  };

  const onHandleEmptyCart = async () => {
    try {
      setLoadingDelete(true);

      const response = await client.cart.emptyCart(
        {
          orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
        },
        {
          fields: {
            cart: "display_total,item_count",
          },
        }
      );
      if (response.isSuccess()) {
        setLineItems([]);
        window.scrollTo(0, 0);
        dispatch({
          type: "UPDATE_ORDER",
          payload: response.success().data,
        });
        setLoadingDelete(false);
        showToast("Se ha vaciado el carrito");
      } else {
        setLoadingDelete(false);
        showToast("Ha ocurrido un error al vaciar el carrito");
      }
    } catch (e) {
      showToast("Ha ocurrido un error al vaciar el carrito");
      setLoadingDelete(false);
    }
  };

  if (lineItems.length <= 0) {
    return <EmptyRecords text="Tu carrito está vacío" />;
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
        <div className="w-full flex md:flex-nowrap md:flex-row flex-col-reverse flex-wrap justify-end items-center mt-10 md:space-x-8">
          <div className="w-full md:w-auto flex md:block ">
            <ComponentButton
              handleClick={onHandleEmptyCart}
              text="Vaciar carrito"
              color="secondary"
              className="w-full"
              loading={loadingDelete}
            />
          </div>
          <div className="w-full md:w-auto flex md:block text-center">
            <ComponentButton
              href={"/cart/address"}
              text="Siguiente"
              className="w-full"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCart;
