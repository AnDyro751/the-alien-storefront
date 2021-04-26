import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../../components/Layouts/Main";
import PropTypes from "prop-types";
import client from "../../src/client";
import MainProduct from "../../components/products/Main";
import { getCurrentCurrency } from "../../src/lib/helpers";

const PageProductShow = ({ product }) => {
  console.log(product);
  return (
    <MainLayout transparentHeader={false}>
      <div className="w-11/12 mx-auto">
        <MainProduct product={product} />
      </div>
    </MainLayout>
  );
};

export default PageProductShow;

export async function getServerSideProps({ req, locale, query }) {
  // console.log(query.slug);
  let response = await client.products.show(query.slug, {
    currency: getCurrentCurrency({}, req.headers.cookie || ""),
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
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

PageProductShow.propTypes = {
  product: PropTypes.object.isRequired,
};
