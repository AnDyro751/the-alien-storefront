import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import ComponentButton from "../Button";
import client from "../../src/client";
import getCookie from "../../src/lib/getCookie";
import { COOKIE_SPREE_ORDER } from "../../src/lib/apiConstants";
import showToast from "../../src/lib/showToast";
import Router from "next/router";
import { getCurrentCurrency } from "../../src/lib/helpers";
import { OrderContext } from "../../src/stores/useOrder";
const SelectShippingRate = ({ shippingRates, data }) => {
  const { state, dispatch } = useContext(OrderContext);
  const [currentShippingRates, setCurrentShippingRates] = useState(
    shippingRates
  );
  const [selected, setSelected] = useState(shippingRates[0]);
  useEffect(() => {
    setCurrentShippingRates(shippingRates);
  }, [shippingRates]);

  const onHandleClick = async () => {
    const response = await client.checkout.orderUpdate(
      {
        orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
      },
      {
        order: {
          shipments_attributes: [
            {
              id: data.data[0]?.id,
              selected_shipping_rate_id: selected?.id,
            },
          ],
        },
        currency: getCurrentCurrency(state.order, document.cookie),
      }
    );
    if (response.isSuccess()) {
      Router.push("/cart/payment");
      console.log(response.success(), "SUCCESS");
    } else {
      showToast("Ha ocurrido un error al seleccionar el método de envío");
    }
  };

  return (
    <div className="w-full mt-8 rounded-md shadow-lg bg-white p-4 md:p-8">
      <h3 className="text-2xl font-medium">Select shipping rate</h3>
      {currentShippingRates.length <= 0 && (
        <h4 className="mt-2 text-sm text-gray-700">
          No hay métodos de envío disponible para la dirección proporcionada
        </h4>
      )}
      <div className="w-full mt-4">
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="space-y-2">
            {currentShippingRates.map((shippingRate, i) => (
              <RadioGroup.Option
                key={i}
                value={shippingRate}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60"
                      : ""
                  }
               ${
                 checked
                   ? "bg-indigo-900 bg-opacity-75 text-white"
                   : "bg-gray-200"
               }
                 relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-lg  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {shippingRate.attributes?.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {shippingRate.attributes?.final_price}
                              {/* {plan.ram}/{plan.cpus} */}
                            </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <BsCheck className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="w-full flex mt-8 justify-end">
        <ComponentButton
          handleClick={onHandleClick}
          text="Siguiente: Método de pago"
        />
      </div>
    </div>
  );
};

SelectShippingRate.propTypes = {
  shippingRates: PropTypes.array.isRequired,
};

SelectShippingRate.defaultProps = {
  shippingRates: [],
};

export default SelectShippingRate;
