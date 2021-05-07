import {useState, useContext, useEffect} from "react";
import {OrderContext} from "../../../src/stores/useOrder";
import isEmpty from "lodash/isEmpty";
import {
    COOKIE_CURRENCY_NAME,
    WEB_ENDPOINT,
} from "../../../src/lib/apiConstants";
import showToast from "../../../src/lib/showToast";
import setCookie from "../../../src/lib/setCookie";
import {getCurrentCurrency} from "../../../src/lib/helpers";
import {useRouter} from "next/router";

const HeadersChangeCurrency = ({forceLoad}) => {
    const router = useRouter();

    const {state, dispatch} = useContext(OrderContext);

    const [currentCurrency, setCurrentCurrency] = useState("USD");
    useEffect(() => {
        if (isEmpty(state.order)) {
            setCurrentCurrency(getCurrentCurrency({}, document.cookie));
        } else {
            setCurrentCurrency(state.order?.attributes?.currency || "USD");
        }
    }, [state.order]);
    const handleChange = (e) => {
        console.log(e.target.value);
        setCurrentCurrency(e.target.value);
        changeCurrency(e.target.value);
    };

    const changeCurrency = async (newCurrency) => {
        console.log(state.order);
        if (isEmpty(state.order)) {
            setCookie(COOKIE_CURRENCY_NAME, newCurrency.toUpperCase(), 30);
            if (forceLoad) {
                router.reload()
            } else {
                router.replace(router.asPath);
            }
        } else {
            try {
                let response = await (
                    await fetch(
                        `${WEB_ENDPOINT}/change_currency.json?switch_to_currency=${newCurrency}&currency=${getCurrentCurrency(
                            state.order,
                            document.cookie
                        )}`,
                        {
                            headers: {
                                "X-Spree-Order-Token": state.order.attributes.token,
                            },
                        }
                    )
                ).json();
                setCookie(COOKIE_CURRENCY_NAME, newCurrency.toUpperCase(), 30);
                dispatch({
                    type: "UPDATE_ORDER",
                    payload: {
                        ...state.order,
                        attributes: {...state.order.attributes, currency: newCurrency},
                    },
                });
                if (forceLoad) {
                    router.reload()
                } else {
                    router.replace(router.asPath);
                }
                console.log(response, "RR");
            } catch (error) {
                console.log(error);
                showToast("Ha ocurrido un error", "#f44336");
            }
        }
    };

    return (
        <select
            className="tw-select block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            onChange={handleChange}
            value={currentCurrency}
        >
            <option value="" disabled>
                Seleccionar
            </option>
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
        </select>
    );
};

export default HeadersChangeCurrency;
