import MainLayout from "../../components/Layouts/Main";
import SelectShippingRate from "../../components/SelectShippingRate";
import client from "../../src/client";
import { COOKIE_CURRENCY_NAME, COOKIE_SPREE_ORDER } from "../../src/lib/apiConstants";
import getCookie from "../../src/lib/getCookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getVariants from "../../src/lib/getVariants";
import CartStepper from "../../components/CartStepper";

const CartDeliveryPage = ({ data }) => {
  return (
    <MainLayout>
      <div className="w-full py-20">
        <CartStepper currentStep="shipment" />
      </div>
      <div className="w-11/12 flex items-start mx-auto md:space-x-8">
        <div className="w-7/12">
          <SelectShippingRate
            data={data}
            shippingRates={getVariants(data.included, "shipping_rate")}
          />
        </div>
      </div>
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
  const response = await client.checkout.shippingMethods(
    {
      orderToken: req
        ? req.headers
          ? getCookie(req.headers.cookie || "", COOKIE_SPREE_ORDER)
          : null
        : null,
    },
    {
      //   fields: "",
      include: "shipping_rates",
    }
  );

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

  if (response.isFail() || resCart.isFail()) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: response.success(),
      dataCart: resCart.success(),
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
}

export default CartDeliveryPage;
