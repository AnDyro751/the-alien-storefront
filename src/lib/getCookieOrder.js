import getCookie from "./getCookie";
import {COOKIE_SPREE_ORDER} from "./apiConstants";

const getCookieOrder = (cookies = "") => {
    return getCookie(cookies || "", COOKIE_SPREE_ORDER)
}

export default getCookieOrder