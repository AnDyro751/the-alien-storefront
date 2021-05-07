import MainLayout from "../../components/Layouts/Main";
import SelectShippingRate from "../../components/SelectShippingRate";
import client from "../../src/client";
import {
  API_ENDPOINT,
  COOKIE_CURRENCY_NAME,
  COOKIE_SPREE_ORDER,
} from "../../src/lib/apiConstants";
import getCookie from "../../src/lib/getCookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CartStepper from "../../components/CartStepper";
import MainPayments from "../../components/Cart/MainPayments";
import EmptyRecords from "../../components/EmptyRecords";

const CartDeliveryPage = ({ data }) => {
  return (
    <MainLayout>
      <div className="w-full py-20">
        <CartStepper currentStep="payment" />
      </div>
      {data.length <= 0 ? (
        <EmptyRecords text="No hay métodos de pago disponibles" />
      ) : (
        <div className="w-11/12 flex items-start mx-auto md:space-x-8">
          <div className="w-7/12">
            <MainPayments data={data} />
          </div>
        </div>
      )}

      <style jsx global>{`
        body,
        html {
          background-color: rgba(243, 244, 246, 1) !important;
        }
      `}</style>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale, req }) {
  let response = null;
  try {
    response = await (
      await fetch(
        `${API_ENDPOINT}/checkout/payment_methods.json?currency=${getCookie(
          req?.headers?.cookie || "",
          COOKIE_CURRENCY_NAME
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Spree-Order-Token": getCookie(
              req.headers.cookie || "",
              COOKIE_SPREE_ORDER
            ),
          },
        }
      )
    ).json();
    console.log(response, "RESPONSE");
  } catch (error) {
    console.log("ER", error);
  }
  // const response = await client.checkout.paymentMethods(
  //   {
  //     orderToken: req
  //       ? req.headers
  //         ? getCookie(req.headers.cookie || "", COOKIE_SPREE_ORDER)
  //         : null
  //       : null,
  //   },
  //   {
  //     // currency: getCookie(req?.headers?.cookie || "", COOKIE_CURRENCY_NAME),
  //   }
  // );

  const resCart = await client.cart.show(
    {
      orderToken: req
        ? req.headers
          ? getCookie(req.headers.cookie || "", COOKIE_SPREE_ORDER)
          : null
        : null,
    },
    {
      include: "line_items",
      fields:
        "display_item_total,display_pre_tax_item_amount,display_pre_tax_total,display_ship_total,display_total,email",
      currency: getCookie(req?.headers?.cookie || "", COOKIE_CURRENCY_NAME),
    }
  );
  // console.log(response === null, resCart.isFail())
  if (response === null || resCart.isFail()) {
    console.log(resCart.fail());
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: response.data || [],
      dataCart: resCart.success(),
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
}

export default CartDeliveryPage;