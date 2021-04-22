import PropTypes from "prop-types";
import ProductsShow from "../Show";
export default function ProductsList({ products }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium">Listando productos</h1>
      {products.map((product, i) => (
        <ProductsShow data={product} key={i} />
      ))}
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
};
