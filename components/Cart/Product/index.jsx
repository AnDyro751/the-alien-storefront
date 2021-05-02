import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import Input from "../../Input";
import Link from "next/link";
import { useState } from "react";
import client from "../../../src/client";
import getCookie from "../../../src/lib/getCookie";
import { COOKIE_SPREE_ORDER } from "../../../src/lib/apiConstants";
import showToast from "../../../src/lib/showToast";
const CartProduct = ({ data, handleDelete }) => {
  const { t } = useTranslation("common");
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteProduct = async () => {
    setLoadingDelete(true);
    const response = await client.cart.removeItem(
      {
        orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
      },
      data.id,
      {
        fields: {
          cart:
            "display_total,currency,display_item_total,display_pre_tax_item_amount,display_pre_tax_total,number,state",
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

  return (
    <div className="w-full flex items-center space-x-4">
      <div className="w-9/12 flex items-center space-x-4">
        <div className="h-20 w-20 bg-gray-200 animate-pulse rounded shadow"></div>
        <div>
          <p className="font-medium text-lg text-gray-900">
            <Link href={`/products/${data.attributes?.slug}`}>
              <a>{data.attributes?.name}</a>
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-800">
            {data.attributes?.display_total} {data.attributes?.currency}
          </p>
          {data.attributes?.options_text && (
            <p className="mt-2 text-sm text-gray-600">
              {data.attributes?.options_text}
            </p>
          )}
        </div>
      </div>
      <div className="w-3/12 flex items-center space-x-4">
        <div className="w-3/4 flex justify-center">
          <Input
            defaultValue={data.attributes?.quantity}
            className="text-center w-full"
            type="number"
            id={`cart_${data.attributes.id}_quantity`}
            name={`cart_${data.attributes.id}_quantity`}
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
