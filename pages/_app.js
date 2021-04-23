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
      orderToken: "HKcACepzuuODr8BHyLRgSg1619137936150",
    },
    {
      currency: "USD",
      fields: {
        cart: "total,item_count,display_total",
      },
    }
  );
  let order = dataOrder.isSuccess() ? dataOrder.success().data : {};
  return { dataOrder: order, ...appProps };
};

export default appWithTranslation(MyApp);
