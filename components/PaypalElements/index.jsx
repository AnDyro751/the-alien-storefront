import React, {useContext, useEffect, useState} from "react";
import {OrderContext} from "../../src/stores/useOrder";
import {getCurrentCurrency} from "../../src/lib/helpers";

const PaypalElements = ({}) => {
    const {state, dispatch} = useContext(OrderContext);
    const [succeeded, setSucceeded] = useState(false);
    const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [billingDetails, setBillingDetails] = useState("");
    // const [order,setOrder] = useState({});

    useEffect(() => {
        createButton()
    }, [state.order])


    const createButton = () => {
        if (window.paypal && document.getElementById("paypal-button-container")) {
            document.querySelector("#paypal-button-container").innerHTML = "";
            console.log("PAYPAL")
            paypal.Buttons({
                // vault: false,
                createOrder: (data, actions) => createOrder(data, actions),
                style: {
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'pill',
                    label: 'pay',
                    tagline: false,
                },
                fundingSource: "paypal"
            }).render('#paypal-button-container');
        } else {
            console.log("NO HAY PAYLE")
        }
    }

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            // charge users $499 per order
                            // currency_code: getCurrentCurrency(state.order),
                            value: parseFloat(state.order?.attributes?.total || 0),
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const {payer} = details;
            setBillingDetails(payer);
            setSucceeded(true);
            console.log(payer, details, "DD")
        }).catch(err => setPaypalErrorMessage("Something went wrong."));
    };


    return (
        <div className="w-full">
            PayWithPaypal
            <div id="paypal-button-container"/>
        </div>
    )
}

export default PaypalElements