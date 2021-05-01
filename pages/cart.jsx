import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../components/Layouts/Main";
import MainCart from "../components/MainCart";
import client from "../src/client";
import { COOKIE_CURRENCY_NAME } from "../src/lib/apiConstants";
import getCookie from "../src/lib/getCookie";

const CartPage = () => {
  return (
    <MainLayout>
      <MainCart />
    </MainLayout>
  );
};

export default CartPage;

export async function getServerSideProps({ locale, req }) {
  const res = await client.cart.show(
    {
      orderToken: req
        ? req.headers
          ? getCookie(req.headers.cookie || "", "X-Spree-Order-Token")
          : null
        : null,
    },
    {
      currency: getCookie(req?.headers?.cookie || "", COOKIE_CURRENCY_NAME),
    }
  );
  if (res.isFail()) {
    console.log(res.fail(), "FAIL");
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
}
