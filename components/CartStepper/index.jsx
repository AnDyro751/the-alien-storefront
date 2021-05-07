/**
 * Copyright (c) 2021 Angel Mendez - Anture
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {BiCartAlt, BiPackage} from "react-icons/bi";
import {BsHouseDoor, BsCheck} from "react-icons/bs";
import {MdPayment} from "react-icons/md";
import includes from "lodash/includes";
import {useEffect, useState} from "react";

const CartStepper = ({currentStep = "cart"}) => {

    const [step, setCurrentStep] = useState(currentStep);

    useEffect(() => {
        setCurrentStep(currentStep)
    }, [currentStep])

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
                <ItemStep text="Carrito" success={isPassed(step, "cart")}>
                    <BiCartAlt
                        size={20}
                        className={getCurrentClass(isPassed(step, "cart"))}
                    />
                </ItemStep>
                <Separator success={isPassed(step, "cart")}/>
                <ItemStep text="Dirección" success={isPassed(step, "address")}>
                    <BsHouseDoor
                        size={20}
                        className={getCurrentClass(isPassed(step, "address"))}
                    />
                </ItemStep>
                <Separator success={isPassed(step, "shipment")}/>
                <ItemStep text="Envío" success={isPassed(step, "shipment")}>
                    <BiPackage
                        size={20}
                        className={getCurrentClass(isPassed(step, "shipment"))}
                    />
                </ItemStep>
                <Separator success={isPassed(step, "payment")}/>
                <ItemStep text="Pago" success={isPassed(step, "payment")}>
                    <MdPayment
                        size={20}
                        className={getCurrentClass(isPassed(step, "payment"))}
                    />
                </ItemStep>
                <Separator success={isPassed(step, "confirm")}/>
                <ItemStep
                    text="Confirmación"
                    success={isPassed(step, "confirm")}
                >
                    <BsCheck
                        size={20}
                        className={getCurrentClass(isPassed(step, "confirm"))}
                    />
                </ItemStep>
            </div>
        </div>
    );
};


const Separator = ({success = false}) => {
    return (
        <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${success ? "border-green-500" : "border-gray-300"}`}/>
    )
}

const ItemStep = ({text, success = false, children}) => {
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
