import PropTypes from "prop-types";
import ProductAddToCart from "../AddToCart";
import Link from "next/link";
export default function ProductsShow({ data }) {
  return (
    <div className="w-full">
      <Link href={`/products/${data.attributes.slug}`}>
        <a>{data.attributes.name}</a>
      </Link>
      <ProductAddToCart className="" product={data} />
    </div>
  );
}

ProductsShow.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
  }),
};
