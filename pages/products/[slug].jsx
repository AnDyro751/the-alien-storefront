import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../../components/Layouts/Main";
import PropTypes from "prop-types";
import client from "../../src/client";
import MainProduct from "../../components/products/Main";
import { getCurrentCurrency } from "../../src/lib/helpers";
import getLocale from "../../src/lib/getLocale";

const PageProductShow = ({ product, data }) => {
  console.log(product, data);
  return (
    <MainLayout transparentHeader={false}>
      <div className="w-11/12 mx-auto">
        <MainProduct product={product} data={data} />
      </div>
    </MainLayout>
  );
};

export default PageProductShow;

export async function getServerSideProps({ req, locale, query }) {
  // console.log(query.slug);
  let response = await client.products.show(query.slug, {
    currency: getCurrentCurrency({}, req.headers.cookie || ""),
    include:
      "default_variant,variants,option_types.option_values,product_properties,images",
    fields: {
      option_value: "name,presentation",
      option_type: "name,presentation",
      image: "styles",
      variant:
        "sku,purchasable,currency,display_price,display_compare_at_price",
      product:
        "name,description,slug,meta_description,meta_keywords,purchasable,currency,display_price,display_compare_at_price",
    },
    locale: getLocale(locale),
  });
  if (response.isFail()) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      success: response.isSuccess(),
      product: response.success().data,
      data: response.success(),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

PageProductShow.propTypes = {
  product: PropTypes.object.isRequired,
};
