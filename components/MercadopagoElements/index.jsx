import {useContext, useEffect, useRef} from "react";
import {getCurrentCurrency} from "../../src/lib/helpers";
import ComponentButton from "../Button";
import {OrderContext} from "../../src/stores/useOrder";

const MercadopagoElements = () => {
    const {state, dispatch} = useContext(OrderContext);
    const mp = useRef(null);
    useEffect(() => {
        loadMercado();
    }, []);


    // const loadMercado = () => {
    //     const script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = "https://sdk.mercadopago.com/js/v2";
    //     script.async = true;
    //     script.onload = () => {
    //         createButton();
    //         // console.log(window.paypal);
    //     };
    //     document.body.appendChild(script);
    // }

    const createButton = () => {
        // if (window.MercadoPago) {
        //     console.log("MER")
        //     let mpInstance = new window.MercadoPago('TEST-02e1d29c-14ff-4739-b1e2-42391974a16e');
        //     //
        //     mp.current = mpInstance.checkout({
        //         preference: {
        //             id: "435312685-01ec28a7-7b98-4795-b56d-a7b2ee0bef9e",
        //         },
        //         mode: "redirect"
        //     });
        // } else {
        //     console.log("NO HAY MERCADO")
        // }
    }

    const handleOpen = () => {
        if (mp.current) {
            if (mp.current.open) {
                console.log(mp.current, "CURRENT")
                mp.current.open()
            }
        }
    }

    return (
        <div className="w-full">
            MERCADO
            <a href="https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=435312685-3420f47c-ae99-4dac-a906-b6f61dfc9d74"
               target={"_blank"}>PAGAR EN MERCADOPAGO</a>
            {/*<button onClick={handleOpen}>Hola</button>*/}
        </div>
    )

}


export default MercadopagoElements