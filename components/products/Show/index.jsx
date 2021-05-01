import PropTypes from "prop-types";
import Link from "next/link";
import getImagesFromIncluded from "../../../src/lib/getImagesFromIncluded";
import getProductImages from "../../../src/lib/getProductImages";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function ProductsShow({ included, product }) {
  const { t } = useTranslation("common");

  const images = getImagesFromIncluded(
    included,
    product.relationships?.images?.data || []
  );
  return (
    <div className="w-full mb-4">
      <div className="w-full mb-4 relative h-96 rounded">
        <Link href={`/products/${product.attributes?.slug}`}>
          <a>
            <Image
              src={getProductImages(images)[0].attributes?.styles[0]?.url}
              layout="fill"
              className="rounded"
              objectFit="cover"
              quality={40}
            />
          </a>
        </Link>
      </div>
      <div className="w-full mb-4">
        <div className="w-full mb-3">
          <Link href={`/products/${product.attributes.slug}`}>
            <a className="text-gray-900">{product.attributes?.display_price}</a>
          </Link>
        </div>
        <Link href={`/products/${product.attributes.slug}`}>
          <a className="font-medium text-xl text-gray-900">
            {product.attributes.name}
          </a>
        </Link>
      </div>
      <div className="flex w-full">
        <Link href={`/products/${product.attributes?.slug}`}>
          <a className="px-8 py-3 w-full transition duration-150 hover:bg-gray-900 text-white text-center h-12 bg-black rounded focus:outline-none">
            {t("products.view_product")}
          </a>
        </Link>
      </div>
      {/* <ProductAddToCart className="w-full" product={product} /> */}
    </div>
  );
}

ProductsShow.propTypes = {
  product: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
  }),
};
