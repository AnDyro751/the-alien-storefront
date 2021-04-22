import PropTypes from 'prop-types';
import ProductAddToCart from '../AddToCart';
export default function ProductsShow({data}){
    return(
        <div className="w-full" >
            {data.attributes.name}
            <ProductAddToCart className="" />
        </div>
    )
}

ProductsShow.propTypes = {
    data: PropTypes.shape({
        attributes: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        id: PropTypes.string.isRequired
    })
}