import PropTypes from 'prop-types';
import ProductsList from "../products/List";
import ProductsCover from "../ProductsCover";

const MainProducts = ({data}) => {
    const products = data.data;
    return (
        <div className="w-full mx-auto mt-28">
            <ProductsCover />
            <ProductsList data={data} products={products}/>
        </div>
    )
}

MainProducts.propTypes = {
    data: PropTypes.object.isRequired
}

export default MainProducts