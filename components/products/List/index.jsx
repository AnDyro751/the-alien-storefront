import PropTypes from "prop-types";
import ProductsShow from "../Show";
export default function ProductsList({ products, data }) {
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-3xl font-medium">Listando productos</h1>
      {products.map((product, i) => (
        <ProductsShow included={data.included} product={product} key={i} />
      ))}
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};
