import { COOKIE_CURRENCY_NAME } from "./apiConstants";
import getCookie from "./getCookie";
import isEmpty from "lodash/isEmpty";
import includes from 'lodash/includes';
export const getCurrentCurrency = (orderContext = {}, cookies="") => {
  if (isEmpty(orderContext)) {
    let currency = getCookie(cookies, COOKIE_CURRENCY_NAME) || "USD";
    if(includes(["MXN", "USD"],currency)){
      return currency
    }else{
      return "USD"
    }
  } else {
    return orderContext.attributes.currency || "USD";
  }
};
