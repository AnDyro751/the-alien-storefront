import PropTypes from "prop-types";
import ProductAddToCart from "../AddToCart";
import Link from "next/link";
import getImagesFromIncluded from "../../../src/lib/getImagesFromIncluded";
export default function ProductsShow({ included, product }) {
  console.log(
    "INCLUDED",
    getImagesFromIncluded(included, product.relationships?.images?.data || [])
  );
  return (
    <div className="w-full">
      <Link href={`/products/${product.attributes.slug}`}>
        <a>{product.attributes.name}</a>
      </Link>
      <ProductAddToCart className="" product={product} />
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
