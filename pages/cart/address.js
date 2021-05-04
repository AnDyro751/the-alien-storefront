import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainAddress from "../../components/Cart/MainAddress";
import MainLayout from "../../components/Layouts/Main";
import client from "../../src/client";
import { COOKIE_CURRENCY_NAME } from "../../src/lib/apiConstants";
import getCookie from "../../src/lib/getCookie";

const AddressCartPage = () => {
  return (
    <>
      <MainLayout>
        <MainAddress />
      </MainLayout>
      <style jsx global>{`
        body,
        html {
          background-color: rgba(243, 244, 246,1) !important;
        }
      `}</style>
    </>
  );
};

export default AddressCartPage;

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
