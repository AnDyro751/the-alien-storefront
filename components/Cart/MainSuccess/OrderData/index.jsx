import PropTypes from 'prop-types'
import Image from 'next/image'

const OrderData = ({order}) => {
    return (
        <div className="w-full text-center flex justify-center flex-wrap">
            {/*<h1 className="text-4xl mt-10">Order No: <span*/}
            {/*    className="font-bold italic">{order.attributes?.number}</span>*/}
            {/*</h1>*/}
            {/*<h2 className="mt-8 text-2xl">*/}
            {/*    Total: <span className="font-bold italic">{order.attributes?.currency} {order.attributes?.total}</span>*/}
            {/*</h2>*/}
            <h1 className="text-3xl font-medium mt-8 w-full text-center">
                Tu compra ha sido exitosa.
            </h1>
            <h2 className="text-lg mt-8 w-full">¡<span className="font-medium" >{order.attributes?.user_name}</span>, muchas gracias por comprar!</h2>
            <div className="relative h-64 w-64 mt-20">
                <Image
                    layout={"fill"}
                    objectFit={"contain"}
                    src={"/v1620346119/clip-93_ywpjkd.png"}
                />
            </div>
        </div>
    )
}


OrderData.propTypes = {
    order: PropTypes.object.isRequired
}
export default OrderData