import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../components/Layouts/Main";
import MainCart from "../components/MainCart";
import client from "../src/client";
import { COOKIE_CURRENCY_NAME } from "../src/lib/apiConstants";
import getCookie from "../src/lib/getCookie";

const CartPage = ({ data }) => {
  return (
    <MainLayout>
      <MainCart data={data} />
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
      include: "line_items",
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
      data: res.success(),
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
}
