import PropTypes from "prop-types";
import ProductGallery from "../../ProductGallery/index.jsx";

const MainProduct = ({ product }) => {
  return (
    <div className="w-full flex mt-10 space-x-8">
      <div className="w-6/12">
        <ProductGallery />
      </div>
      <div className="w-6/12">
        <h1 className="text-5xl mb-6 font-bold">{product.attributes.name}</h1>
        <h2 className="text-3xl mb-6 font-bold text-gray-800 flex items-center">
          {product.attributes.currency} {product.attributes.display_price}
          {product.attributes.display_compare_at_price && (
            <span className="ml-4 text-2xl text-red-700 line-through select-none">
              {product.attributes.display_compare_at_price}
            </span>
          )}
        </h2>
        {product.attributes.description && (
          <h3 className="text-gray-800 font-normal">
            {product.attributes.description}
          </h3>
        )}
      </div>
    </div>
  );
};
export default MainProduct;

MainProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
