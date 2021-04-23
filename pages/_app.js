import App from "next/app";
import { OrderContextProvider } from "../src/stores/useOrder";
import "../styles/globals.css";
import "../styles/general.css"
import Router from "next/router";
import NProgress from "nprogress";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
import { appWithTranslation } from "next-i18next";
import client from "../src/client";
import getCookie from "../src/lib/getCookie";
import "toastify-js/src/toastify.css";
import { cartFields } from "../src/lib/fields";
import { getCurrentCurrency } from "../src/lib/helpers";
import { COOKIE_CURRENCY_NAME } from "../src/lib/apiConstants";
import { LocaleContextProvider } from "../src/stores/useLocale";
import includes from "lodash/includes";
function MyApp({ Component, pageProps, dataOrder, dataLocale }) {
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
  const dataOrder = await client.cart.show(
    {
      orderToken: appContext
        ? appContext.ctx
          ? appContext.ctx.req
            ? appContext.ctx.req.headers
              ? getCookie(
                  appContext.ctx.req.headers.cookie || "",
                  "X-Spree-Order-Token"
                )
              : null
            : null
          : null
        : null,
    },
    {
      currency: getCookie(
        appContext?.ctx?.req?.headers?.cookie || "",
        COOKIE_CURRENCY_NAME
      ),
      fields: {
        cart: cartFields,
      },
    }
  );
  let order = dataOrder.isSuccess() ? dataOrder.success().data : {};
  let dataLocale = getLocale(appContext);
  return { dataOrder: order, ...appProps, dataLocale };
};

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
