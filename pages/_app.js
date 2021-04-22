import App from "next/app";
import { OrderContextProvider } from "../src/stores/useOrder";
import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps, dataOrder }) {
  const data = dataOrder;
  return (
    <OrderContextProvider
      data={{
        order: data ? (data.currentOrder ? data.currentOrder || {} : {}) : {},
      }}
    >
      <Component {...pageProps} />;
    </OrderContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { dataOrder: {}, ...appProps };
};

export default appWithTranslation(MyApp);
