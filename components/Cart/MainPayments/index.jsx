import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from "react";
// import PaypalElements from "../../PaypalElements";
import dynamic from 'next/dynamic';
import {OrderContext} from "../../../src/stores/useOrder";
// import StripeElements from "../../StripeElements";
const StripeElements = dynamic(() => import("../../StripeElements"), {ssr: false})
const PaypalElements = dynamic(() => import("../../PaypalElements"), {ssr: false})
const MercadopagoElements = dynamic(() => import("../../MercadopagoElements"), {ssr: false})
const MainPayments = ({data}) => {
    //
    // const {state, dispatch} = useContext(OrderContext);
    //
    // useEffect(() => {
    //
    // }, [state.order])

    function renderPaymentMethod(type) {
        switch (type) {
            case "Spree::Gateway::StripeElementsGateway":
                return (<StripeElements/>);
            case "Spree::Gateway::PayPalExpress":
                return (<PaypalElements/>)
            case "Spree::Gateway::Mercadopago":
                return(<MercadopagoElements />)
            default:
                return type

        }
    }

    return (
        <div className="w-full p-4 rounded bg-white shadow-lg">
            <h3 className="text-2xl font-medium my-4">Select Payment Method</h3>
            {/*<PaypalElements/>*/}
            {data.map((paymentmethod, i) => (
                <div
                    className="w-full"
                    // onclick={() => handleselect(paymentmethod)}
                    key={i}
                >
                    {renderPaymentMethod(paymentmethod.attributes?.type)}
                </div>
            ))}
        </div>
    );
};

MainPayments.propTypes = {
    data: PropTypes.array.isRequired,
};

MainPayments.defaultProps = {
    data: [],
};
export default MainPayments;
