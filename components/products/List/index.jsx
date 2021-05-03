import PropTypes from "prop-types";
import ProductsShow from "../Show";
import { useTranslation } from "next-i18next";

export default function ProductsList({ products, data }) {
  const { t } = useTranslation("common");

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-3xl text-gray-900 mb-10 font-medium">
        {t("products.all_products")}
      </h1>
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <div className="w-full" key={i}>
            <ProductsShow included={data.included} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};
