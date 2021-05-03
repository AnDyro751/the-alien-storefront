import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import Input from "../../Input";
import Link from "next/link";
import { useContext, useState } from "react";
import client from "../../../src/client";
import getCookie from "../../../src/lib/getCookie";
import { COOKIE_SPREE_ORDER } from "../../../src/lib/apiConstants";
import showToast from "../../../src/lib/showToast";
import getRecord from "../../../src/lib/getRecord";
import { OrderContext } from "../../../src/stores/useOrder";
const CartProduct = ({ data, handleDelete, handleUpdate }) => {
  const { t } = useTranslation("common");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [productData, setProductData] = useState(data);

  const { state, dispatch } = useContext(OrderContext);

  const handleDeleteProduct = async () => {
    setLoadingDelete(true);
    const response = await client.cart.removeItem(
      {
        orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
      },
      productData.id,
      {
        fields: {
          cart:
            "display_total,currency,item_count,display_item_total,display_pre_tax_item_amount,display_pre_tax_total,number,state",
        },
      }
    );
    if (response.isSuccess()) {
      console.log(response.success());
      setLoadingDelete(false);
      handleDelete(data, response.success());
      showToast("Producto eliminado");
    } else {
      showToast("No se ha podido eliminar el producto");
      setLoadingDelete(false);
    }
  };

  const handleBlur = async (e) => {
    let newValue = parseInt(e.target.value) || 0;
    if (newValue <= 0) {
      handleDeleteProduct();
    } else {
      if (newValue !== (parseInt(productData.attributes?.quantity) || 0)) {
        const response = await client.cart.setQuantity(
          {
            orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
          },
          {
            line_item_id: productData.id,
            quantity: newValue,
            fields: {
              cart:
                "display_total,currency,item_count,display_item_total,display_pre_tax_item_amount,display_pre_tax_total,number,state",
            },
            include: "line_items",
          }
        );
        if (response.isSuccess()) {
          console.log(response.success());
          if (response.success().included.length > 0) {
            showToast("Carrito actualizado");
            setProductData(
              getRecord(response.success().included, productData.id)
            );
            handleUpdate(response.success());
            console.log(response.success().data);
            dispatch({
              type: "UPDATE_ORDER",
              payload: response.success().data,
            });
          } else {
            showToast("Ha ocurrido un error al actualizar el elemento");
          }
        } else {
          showToast("Ha ocurrido un error al actualizar el elemento");
        }
      }
    }
  };

  return (
    <div className="w-full flex items-center space-x-4">
      <div className="w-9/12 flex items-center space-x-4">
        <div className="h-20 w-20 bg-gray-200 animate-pulse rounded shadow"></div>
        <div>
          <p className="font-medium text-lg text-gray-900">
            <Link href={`/products/${productData.attributes?.slug}`}>
              <a>{productData.attributes?.name}</a>
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-800">
            {productData.attributes?.display_total}{" "}
            {productData.attributes?.currency}
          </p>
          {productData.attributes?.options_text && (
            <p className="mt-2 text-sm text-gray-600">
              {productData.attributes?.options_text}
            </p>
          )}
        </div>
      </div>
      <div className="w-3/12 flex items-center space-x-4">
        <div className="w-3/4 flex justify-center">
          <Input
            onBlur={handleBlur}
            defaultValue={productData.attributes?.quantity}
            className="text-center w-full"
            type="number"
            id={`cart_${productData.attributes.id}_quantity`}
            name={`cart_${productData.attributes.id}_quantity`}
          />
        </div>
        <div className="w-1/4 flex justify-end">
          <button
            disabled={loadingDelete}
            onClick={handleDeleteProduct}
            title={`${t("delete_product")}`}
            className={`${
              loadingDelete
                ? "cursor-not-allowed opacity-70 bg-red-500 text-white"
                : "bg-white "
            } h-12 hover:shadow-xl border w-12 cursor-pointer rounded transition duration-300 hover:text-white hover:bg-red-600 flex justify-center items-center`}
          >
            <BsTrash className="text-current fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
CartProduct.propTypes = {
  data: PropTypes.object.isRequired,
};
CartProduct.defaultProps = {
  data: {},
};

export default CartProduct;
