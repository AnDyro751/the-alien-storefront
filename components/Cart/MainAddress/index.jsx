import { useEffect, useState } from "react";
import client from "../../../src/client";
import showToast from "../../../src/lib/showToast";
import ComponentButton from "../../Button";
import Input from "../../Input";
import InputSelect from "../../InputSelect";

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

  const onClickNext = () => {
    alert("HOLA");
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl py-8 font-medium">Shipping address</h1>
      <div className="w-full flex md:space-x-8">
        <div className="w-full md:w-7/12 rounded-md shadow-lg bg-white p-4 md:p-8">
          <AddressForm countries={countries} />

          <div className="mt-8 flex justify-end">
            <ComponentButton
              text="Siguiente: Método de envío"
              handleClick={onClickNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressForm = ({ countries }) => {
  const handleChange = () => {};
  return (
    <div className="space-y-4">
      <Input
        name="name"
        id="address_name"
        label="Name"
        placehoder="David Smith"
        required
        handleChange={handleChange}
      />
      <Input
        name="email"
        id="address_email"
        label="Email"
        placehoder="david@mail.com"
        required
        type="email"
        handleChange={handleChange}
      />
      <Input
        name="address"
        id="address_address"
        label="Address"
        placehoder="Address"
        required
        handleChange={handleChange}
      />
      <div className="flex items-center space-x-4">
        <Input
          name="city"
          id="address_city"
          label="City"
          placehoder="City"
          required
          handleChange={handleChange}
        />
        <Input
          name="cp"
          id="address_cp"
          label="Zip Code"
          placehoder="000000"
          required
          handleChange={handleChange}
        />
      </div>
      <div className="w-full">
        <InputSelect
          options={countries}
          label="Country"
          placeholder="Select country"
          name="country"
          id="address_country"
        />
      </div>
    </div>
  );
};

export default MainAddress;
