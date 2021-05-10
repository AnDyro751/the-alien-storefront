import App from "next/app";
import {OrderContextProvider} from "../src/stores/useOrder";
import "../styles/globals.css";
import "../styles/general.css"
import Router from "next/router";
import NProgress from "nprogress";
import {setCookie, destroyCookie} from 'nookies';
import {appWithTranslation} from "next-i18next";
import client from "../src/client";
import getCookie from "../src/lib/getCookie";
import "toastify-js/src/toastify.css";
import {cartFields} from "../src/lib/fields";
import {getCurrentCurrency} from "../src/lib/helpers";
import {COOKIE_CURRENCY_NAME, COOKIE_SPREE_ORDER} from "../src/lib/apiConstants";
import {LocaleContextProvider} from "../src/stores/useLocale";
import includes from "lodash/includes";
import {serialize} from 'cookie';
import withSession from "../src/lib/session";
// import {PayPalScriptProvider} from "@paypal/react-paypal-js";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp(props) {
    const {Component, pageProps, dataOrder, dataLocale} = props;
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
                {/*<PayPalScriptProvider*/}
                {/*    options={{"client-id": "AZlVfjh-dmrlQgZLl7NGz5oEEK9fkR8o-ZLatcVBF5dkiEvp0kmr_9l7IRvPdPZ5r6krEiaQ7WEwO7m9"}}>*/}
                <Component {...pageProps} dataLocale={dataLocale}/>
                {/*</PayPalScriptProvider>*/}
            </LocaleContextProvider>
        </OrderContextProvider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    // console.log(, "REQ")
    const appProps = await App.getInitialProps(appContext);
    if (appContext) {
        const res = appContext.ctx.res;
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
                    destroyCookie(appContext.ctx, COOKIE_SPREE_ORDER);
                    let createCart = await createNewCart(cookieCurrency);
                    if (createCart.success()) {
                        res.statusCode = 307
                        res.setHeader('Location', appContext.ctx.pathname);
                        setCookie(appContext?.ctx, COOKIE_SPREE_ORDER, createCart.success().data.attributes.token, {
                            httpOnly: false // true by default
                        })
                        res.end()
                        order = createCart.success().data
                    }
                }
            }
        } else {
            destroyCookie(appContext.ctx, COOKIE_SPREE_ORDER);
            let createCart = await createNewCart(cookieCurrency);
            if (createCart.success()) {
                res.statusCode = 307
                res.setHeader('Location', appContext.ctx.pathname)
                setCookie(appContext?.ctx, COOKIE_SPREE_ORDER, createCart.success().data.attributes.token, {
                    httpOnly: false // true by default
                })
                res.end()
                order = createCart.success().data
            }
        }

        // return {...appProps, dataLocale}
        return {dataOrder: order, dataLocale, ...appProps};
    } else {
        return {...appProps}
    }
};

const createNewCart = async (currency) => {
    let order = await client.cart.create(
        {},
        {
            currency: currency,
            fields: {
                cart: cartFields,
            },
        }
    );
    if (order.isFail()) {
        console.log(order.fail(), "FAIL cart")
    } else {
        console.log(order.success().data, "DATA ORDER")
    }
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
