import PropTypes from "prop-types";

const MainProduct = ({ product }) => {
  return (
    <div className="w-full flex items-start mt-10">
      <div className="w-6/12"></div>
      <div className="w-6/12">
        <h1 className="text-4xl mb-4 font-bold" >{product.attributes.name}</h1>
        <h3 className="text-3xl mb-4 font-bold text-gray-800" >{product.attributes.currency} {product.attributes.price}</h3>
      </div>
    </div>
  );
};
export default MainProduct;

MainProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
