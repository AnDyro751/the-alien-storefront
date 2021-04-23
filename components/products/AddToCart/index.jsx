import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { OrderContext } from "../../../src/stores/useOrder";
import client from "../../../src/client";
import setCookie from "../../../src/lib/setCookie";
import { fetchAddToCart, validResponse } from "../../../src/lib/fetchs";

export default function ProductAddToCart({ text, className }) {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(OrderContext);
  useEffect(() => {
    // console.log(state, dispatch);
  }, []);
  const addProductToCart = async () => {
    try {
      let response = await client.cart.create("", {
        currency: "USD",
      });
      if (response.isSuccess()) {
        setCookie(
          "X-Spree-Order-Token",
          response.success().data.attributes.token,
          30
        );
        dispatch({ type: "UPDATE_ORDER", payload: response.success().data });
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <button
      onClick={addProductToCart}
      className={`bg-black rounded flex h-12 focus:outline-none justify-center items-center px-4 py-3 ${
        loading && "opacity-70 cursor-not-allowed"
      } ${className}`}
      disabled={loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span className="text-white">{text}</span>
    </button>
  );
}

ProductAddToCart.propTypes = {
  text: PropTypes.string.isRequired,
};
ProductAddToCart.defaultProps = {
  text: "Agregar al carrito",
  className: "",
};
