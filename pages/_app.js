import App from "next/app";
import { OrderContextProvider } from "../src/stores/useOrder";
import "../styles/globals.css";
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
function MyApp({ Component, pageProps, dataOrder }) {
  const data = dataOrder;
  return (
    <OrderContextProvider
      data={{
        order: data,
      }}
    >
      <Component {...pageProps} />
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
        appContext?.ctx?.req?.headers?.cookie,
        COOKIE_CURRENCY_NAME
      ),
      fields: {
        cart: cartFields,
      },
    }
  );
  let order = dataOrder.isSuccess() ? dataOrder.success().data : {};
  return { dataOrder: order, ...appProps };
};

export default appWithTranslation(MyApp);
