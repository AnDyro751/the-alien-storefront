import App from "next/app";
import {OrderContextProvider} from "../src/stores/useOrder";
import "../styles/globals.css";
import "../styles/general.css"
import Router from "next/router";
import NProgress from "nprogress";
import Cookies from 'cookies';
import {appWithTranslation} from "next-i18next";
import client from "../src/client";
import getCookie from "../src/lib/getCookie";
import "toastify-js/src/toastify.css";
import {cartFields} from "../src/lib/fields";
import {getCurrentCurrency} from "../src/lib/helpers";
import {COOKIE_CURRENCY_NAME, COOKIE_SPREE_ORDER} from "../src/lib/apiConstants";
import {LocaleContextProvider} from "../src/stores/useLocale";
import includes from "lodash/includes";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({Component, pageProps, dataOrder, dataLocale}) {
    const data = dataOrder;
    return (
        <OrderContextProvider
            data={{
                order: data,
            }}
        >
            <LocaleContextProvider
                data={{
                    locale: dataLocale,
                }}
            >
                <Component {...pageProps} />
            </LocaleContextProvider>
        </OrderContextProvider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const cookies = new Cookies(appContext.ctx.req, appContext.ctx.res)
    const cookieOrder = getCookie(
        appContext?.ctx?.req?.headers?.cookie || "",
        COOKIE_SPREE_ORDER
    )
    const cookieCurrency = getCookie(
        appContext?.ctx?.req?.headers?.cookie || "",
        COOKIE_CURRENCY_NAME
    );
    let dataLocale = getLocale(appContext);
    let order;
    if (cookieOrder) {
        const dataOrder = await client.cart.show(
            {
                orderToken: cookieOrder
            },
            {
                currency: cookieCurrency,
                fields: {
                    cart: cartFields,
                },
            }
        );
        if (dataOrder.isSuccess()) {
            order = dataOrder.success().data
        }
        if (dataOrder.isFail()) {
            if (dataOrder.fail().message.includes("404")) {
                let createCart = await createNewCart(appContext?.ctx?.req?.headers?.cookie || "");
                if (createCart.success()) {
                    cookies.set(COOKIE_SPREE_ORDER, createCart.success().data.attributes.token, {
                        httpOnly: false // true by default
                    })
                    order = createCart.success().data
                }
            }
        }
    } else {
        let createCart = await createNewCart(appContext?.ctx?.req?.headers?.cookie || "");
        if (createCart.success()) {
            cookies.set(COOKIE_SPREE_ORDER, createCart.success().data.attributes.token, {
                httpOnly: false // true by default
            })
            order = createCart.success().data
        }
    }

    return {dataOrder: order, ...appProps, dataLocale};
};

const createNewCart = async (cookies) => {
    let order = await client.cart.create(
        {},
        {
            currency: getCookie(
                cookies || "",
                COOKIE_CURRENCY_NAME
            ),
            fields: {
                cart: cartFields,
            },
        }
    );
    return order;
}

const getLocale = (appCtx) => {
    if (appCtx) {
        if (appCtx.ctx) {
            if (appCtx.ctx.req) {
                if (appCtx.ctx.req.headers) {
                    if (appCtx.ctx.req.headers.cookie) {
                        const cookieLocale = getCookie(
                            appCtx.ctx.req.headers.cookie || "",
                            "NEXT_LOCALE"
                        );
                        if (includes(["en", "es"], cookieLocale)) {
                            return cookieLocale;
                        } else {
                            return "en";
                        }
                    } else {
                        return "en";
                    }
                } else {
                    return "en";
                }
            } else {
                return "en";
            }
        } else {
            return "en";
        }
    }
    return "en";
};

export default appWithTranslation(MyApp);
