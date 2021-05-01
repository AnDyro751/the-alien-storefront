/**
 * Copyright (c) 2021 Angel Mendez - Anture
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { BiCartAlt, BiPackage } from "react-icons/bi";
import { BsHouseDoor, BsCheck } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import includes from "lodash/includes";

const CartStepper = ({ currentStep = "cart" }) => {
  const getCurrentClass = (activeOption) => {
    if (activeOption) {
      return "text-white";
    } else {
      return "text-gray-500";
    }
  };

  const isPassed = (current, option) => {
    if (current === option) {
      return true;
    } else if (current === "address") {
      return includes(["cart", "address"], option);
    } else if (current === "shipment") {
      return includes(["cart", "address", "shipment"], option);
    } else if (current === "payment") {
      return includes(["cart", "address", "shipment", "payment"], option);
    } else if (current === "confirm") {
      return includes(
        ["cart", "address", "shipment", "payment", "confirm"],
        option
      );
    }
  };

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto flex items-center space-x-4">
        <ItemStep text="Carrito" success={isPassed(currentStep, "cart")}>
          <BiCartAlt
            size={20}
            className={getCurrentClass(isPassed(currentStep, "cart"))}
          />
        </ItemStep>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-green-500"></div>
        <ItemStep text="Dirección" success={isPassed(currentStep, "address")}>
          <BsHouseDoor
            size={20}
            className={getCurrentClass(isPassed(currentStep, "address"))}
          />
        </ItemStep>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
        <ItemStep text="Envío" success={isPassed(currentStep, "shipment")}>
          <BiPackage
            size={20}
            className={getCurrentClass(isPassed(currentStep, "shipment"))}
          />
        </ItemStep>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
        <ItemStep text="Pago" success={isPassed(currentStep, "payment")}>
          <MdPayment
            size={20}
            className={getCurrentClass(isPassed(currentStep, "payment"))}
          />
        </ItemStep>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
        <ItemStep
          text="Confirmación"
          success={isPassed(currentStep, "confirm")}
        >
          <BsCheck
            size={20}
            className={getCurrentClass(isPassed(currentStep, "confirm"))}
          />
        </ItemStep>
      </div>
    </div>
  );
};

const ItemStep = ({ text, success = false, children }) => {
  return (
    <div className="flex relative">
      <div
        className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center items-center ${
          success
            ? "border-green-500 bg-green-500 shadow-lg"
            : "border-gray-300"
        }`}
      >
        {children}
      </div>
      <div
        className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
          success ? "text-green-600" : "text-gray-500"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default CartStepper;
