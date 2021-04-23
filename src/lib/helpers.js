import { COOKIE_CURRENCY_NAME } from "./apiConstants";
import getCookie from "./getCookie";
import isEmpty from "lodash/isEmpty";
export const getCurrentCurrency = (orderContext = {}) => {
  if (isEmpty(orderContext)) {
    return getCookie(document.cookie, COOKIE_CURRENCY_NAME);
  } else {
    return orderContext.attributes.currency;
  }
};
