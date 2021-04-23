import { CART_ENDPOINT } from "./apiConstants";

const fetchAddToCart = async () => {
  try {
    let response = await (
      await fetch(CART_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          currency: "USD",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return response.data;
  } catch {
    return null;
  }
};

const validResponse = (response) => {
  if (
    response !== null ||
    response !== "null" ||
    response !== undefined ||
    response !== "undefined"
  ) {
    return true;
  } else {
    return false;
  }
};

export { fetchAddToCart,validResponse };
