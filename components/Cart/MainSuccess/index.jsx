import {useContext, useEffect, useState} from "react";
import client from "../../../src/client";
import getQueryParams from "../../../src/lib/getQueryParams";
import getCookie from "../../../src/lib/getCookie";
import {COOKIE_CURRENCY_NAME, COOKIE_SPREE_ORDER, WEB_ENDPOINT} from "../../../src/lib/apiConstants";
import {OrderContext} from "../../../src/stores/useOrder";
import deleteCookie from "../../../src/lib/deleteCookie";
import {getCurrentCurrency} from "../../../src/lib/helpers";
import {cartFields} from "../../../src/lib/fields";
import showToast from "../../../src/lib/showToast";
import setCookie from "../../../src/lib/setCookie";
import Image from 'next/image';
import CartStepper from "../../CartStepper";
import OrderData from "./OrderData";
import {useRouter} from 'next/router'

let timer;

const MainSuccess = ({payment_type}) => {
    console.log(payment_type)
    const router = useRouter()
    const {state, dispatch} = useContext(OrderContext);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        timer = setInterval(() => {
            if (payment_type === "stripe") {
                handleGetStripeOrder()
            } else {
                completeMercadoOrder();
            }
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const completeMercadoOrder = async () => {
        const {order_number, payment_id} = router.query
        try {
            const res = await (await fetch(`${WEB_ENDPOINT}/mercado_pago_complete`, {
                body: JSON.stringify({
                    order_number: order_number,
                    payment_id: payment_id
                }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })).json()
            if (res.success) {
                clearInterval(timer);
                setCompleted(true);
                handleDeleteAllSession();
            }
        } catch (e) {
            console.log("ERROR", e)
        }
    }

    const handleGetStripeOrder = async () => {
        const res = await (await fetch(`${WEB_ENDPOINT}/get_order/${getQueryParams("order_number")}`)).json()
        console.log("HANDLE get", res)
        if (res.status === "ok") {
            setOrder({attributes: res.order} || {});
            if (res.order.state === "complete") {
                setCompleted(true);
                clearInterval(timer);
                setLoading(false);
                if (res.order.token === getCookie(document.cookie || "", COOKIE_SPREE_ORDER)) {
                    handleDeleteAllSession();
                } else {
                    console.log("LN 35")
                }
            } else {
                console.log("LN 38")
            }
        } else {
            showToast("La orden no ha sido encontrada");
            setTimeout(() => {
                window.location = "/products";
            }, 1500);
        }
    }

    const handleDeleteAllSession = () => {
        dispatch({type: "DELETE_ORDER"});
        deleteCookie(COOKIE_SPREE_ORDER);
        setLoading(false);
        createNewOrder();
    }

    const createNewOrder = async () => {
        let response = await client.cart.create(
            {},
            {
                currency: getCurrentCurrency(state.order, document.cookie),
                fields: {
                    cart: cartFields,
                },
            }
        );
        if (response.isFail()) {
            showToast("Ha ocurrido un error al crear la nueva orden");
        } else {
            setOrder(response.success().data);
            dispatch({type: "UPDATE_ORDER", payload: response.success().data});
            setCookie(
                "X-Spree-Order-Token",
                response.success().data.attributes.token,
                30,
            );
            window.location = "/";
        }
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="py-20">
                <CartStepper currentStep={completed ? "confirm" : "payment"}/>
            </div>
            {
                loading &&
                <div className={"h-96 flex justify-center items-center"}>
                    <div className="h-20 w-20 relative">
                        <Image src={"/v1620345118/icons8-loading-infinity_psllfe.gif"}
                               layout="fill"
                               objectFit={"contain"}
                        />
                    </div>
                </div>
                // <h2>Cargando....</h2>
            }
            {
                !loading &&
                <OrderData order={order}/>
            }
        </div>
    )
}

export default MainSuccess