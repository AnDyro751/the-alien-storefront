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
const MainCart = ({ data }) => {
  const [lineItems, setLineItems] = useState(
    getVariants(data.included, "line_item")
  );
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
    return (
      <div className="h-screen w-11/12 flex-wrap mx-auto flex items-center justify-center">
        <div className="w-full relative flex-wrap mx-auto flex items-center justify-center ">
          <div className="w-full text-center">
            <h1 className="text-4xl w-full font-medium">
              Tu carrito est?? vac??o
            </h1>
            <div className="relative h-60 w-full my-20">
              <Image
                src="v1620062669/kingdom-list-is-empty_iab9dw.png"
                layout="fill"
                quality={50}
                objectFit="contain"
              />
            </div>
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
        <div className="w-full flex justify-end mt-10 space-x-8">
          <ComponentButton
            handleClick={onHandleEmptyCart}
            text="Vaciar carrito"
            color="secondary"
            loading={loadingDelete}
          />
          <ComponentButton
            href={"/cart/address"}
            text="Siguiente"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default MainCart;
