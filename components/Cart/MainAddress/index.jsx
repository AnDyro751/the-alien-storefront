import { useEffect, useState } from "react";
import client from "../../../src/client";
import showToast from "../../../src/lib/showToast";
import ComponentButton from "../../Button";
import CartStepper from "../../CartStepper";

import AddressForm from "../AddressForm";

const MainAddress = ({ data }) => {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      const response = await client.countries.list();
      //   console.log(response.success())
      if (response.isSuccess()) {
        setCountries(response.success().data);
        setSelected(response.success().data[0]);
      } else {
        showToast("Ha ocurrido un error al traer los países");
      }
    };
    getCountries();
  }, []);



  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full py-20">
        <CartStepper currentStep="address" />
      </div>
      <h1 className="text-3xl py-8 font-medium">Shipping address</h1>
      <div className="w-full flex md:space-x-8">
        <div className="w-full md:w-7/12">
          <AddressForm countries={countries} />
        </div>
        
      </div>
    </div>
  );
};

export default MainAddress;
