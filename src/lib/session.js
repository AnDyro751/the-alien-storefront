import {withIronSession} from 'next-iron-session'
import {COOKIE_SPREE_ORDER} from "./apiConstants";

export default function withSession(handler) {
    return withIronSession(handler, {
        password: "popodeperro",
        cookieName: COOKIE_SPREE_ORDER,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production' ? true : false,
        },
    })
}