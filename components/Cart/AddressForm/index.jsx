import Input from "../../Input";
import InputSelect from "../../InputSelect";
import { useFormik } from "formik";
import ComponentButton from "../../Button";
import client from "../../../src/client";
import { useContext, useState } from "react";
import getVariants from "../../../src/lib/getVariants";
import getCookie from "../../../src/lib/getCookie";
import showToast from "../../../src/lib/showToast";
import { COOKIE_SPREE_ORDER } from "../../../src/lib/apiConstants";
import SelectShippingRate from "../../SelectShippingRate";
import Router from "next/router";
import { getCurrentCurrency } from "../../../src/lib/helpers";
import { OrderContext } from "../../../src/stores/useOrder";

const AddressForm = ({ countries }) => {
  const { state, dispatch } = useContext(OrderContext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shippingRates, setShippingRates] = useState([]);

  const validate = (values) => {
    const errors = {};
    // name
    if (!values.firstname) {
      errors.firstname = "Required";
    } else if (values.firstname.length > 40) {
      errors.firstname = "Please enter a shorter name";
    } else if (values.firstname.length <= 1) {
      errors.firstname = "Please enter a longer name";
    }
    // lastname
    if (!values.lastname) {
      errors.lastname = "Required";
    } else if (values.lastname.length > 40) {
      errors.name = "Please enter a shorter last name";
    } else if (values.lastname.length <= 1) {
      errors.name = "Please enter a longer last name";
    }
    // address
    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length > 100) {
      errors.name = "Please enter a shorter address";
    } else if (values.address.length <= 1) {
      errors.name = "Please enter a longer address";
    }
    // city
    if (!values.city) {
      errors.city = "Required";
    } else if (values.city.length > 40) {
      errors.name = "Please enter a shorter city";
    } else if (values.city.length <= 1) {
      errors.name = "Please enter a longer city";
    }
    // cp
    if (!values.cp) {
      errors.cp = "Required";
    } else if (values.cp.length > 8) {
      errors.name = "Please enter a shorter zip code";
    } else if (values.cp.length <= 1) {
      errors.name = "Please enter a longer code";
    }
    // email
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      address: "",
      city: "",
      cp: "",
    },
    onSubmit: (values) => {
      // alert("HOLA")
      handleUpdateAddress();
    },
    validate: validate,
  });

  const handleUpdateAddress = async () => {
    setLoading(true);
    try {
      const response = await client.checkout.orderUpdate(
        {
          orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
        },
        {
          order: {
            bill_address_attributes: {
              firstname: formik.values.firstname,
              lastname: formik.values.lastname,
              address1: formik.values.address,
              city: formik.values.city,
              phone: formik.values.phone,
              zipcode: formik.values.cp,
              state_name: selectedState,
              country_iso: selectedCountry,
            },
            email: formik.values.email,
            ship_address_attributes: {
              firstname: formik.values.firstname,
              lastname: formik.values.lastname,
              address1: formik.values.address,
              city: formik.values.city,
              phone: formik.values.phone,
              zipcode: formik.values.cp,
              state_name: selectedState,
              country_iso: selectedCountry,
            },
          },
          fields: "total",
          currency: getCurrentCurrency(state.order, document.cookie),
        }
      );
      setLoading(false);
      if (response.isSuccess()) {
        Router.push("/cart/delivery");
      } else {
        console.log("FAIL", response.fail());
        showToast("Ha ocurrido un error al actualizar el checkout");
      }
    } catch (error) {
      console.log("HOLA");
      setLoading(false);
      showToast("Ha ocurrido un error al actualizar el checkout");
    }
  };

  const onChangeCountry = async (e) => {
    setLoading(true);
    setSelectedState([]);
    setSelectedCountry(e.target.value || "");
    const response = await client.countries.show(e.target.value, {
      include: "states",
    });

    if (response.isSuccess()) {
      setLoading(false);
      setStates(getVariants(response.success().included || [], "state"));
    } else {
      setLoading(false);
      showToast("Ha ocurrido un error al buscar el país");
    }
  };

  const onChangeState = (e) => {
    setSelectedState(e.target.value || "");
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 rounded-md shadow-lg bg-white p-4 md:p-8"
      >
        <div className="w-full flex items-center space-x-4">
          <Input
            error={formik.touched.firstname ? formik.errors.firstname : null}
            name="firstname"
            id="address_firstname"
            label="Name"
            placehoder="David"
            required
            handleChange={formik.handleChange}
          />
          <Input
            error={formik.touched.lastname ? formik.errors.lastname : null}
            name="lastname"
            id="address_lastname"
            label="Last Name"
            placehoder="David"
            required
            handleChange={formik.handleChange}
          />
        </div>
        <div className="w-full flex items-center space-x-4">
          <Input
            error={formik.touched.email ? formik.errors.email : null}
            name="email"
            id="address_email"
            label="Email"
            placehoder="david@mail.com"
            required
            type="email"
            handleChange={formik.handleChange}
          />
          <Input
            error={formik.touched.phone ? formik.errors.phone : null}
            name="phone"
            id="address_phone"
            label="Phone"
            placehoder="+52951607458"
            required
            type="phone"
            handleChange={formik.handleChange}
          />
        </div>
        <Input
          error={formik.touched.address ? formik.errors.address : null}
          name="address"
          id="address_address"
          label="Address"
          placehoder="Address"
          required
          handleChange={formik.handleChange}
        />
        <div className="flex items-center space-x-4">
          <Input
            error={formik.touched.city ? formik.errors.city : null}
            name="city"
            id="address_city"
            label="City"
            placehoder="City"
            required
            handleChange={formik.handleChange}
          />
          <Input
            error={formik.touched.cp ? formik.errors.cp : null}
            name="cp"
            id="address_cp"
            label="Zip Code"
            placehoder="000000"
            required
            handleChange={formik.handleChange}
          />
        </div>
        <div className="w-full space-x-4 flex items-center">
          <div className="w-6/12">
            <InputSelect
              handleChange={onChangeCountry}
              options={countries}
              label="Country"
              placeholder="Select country"
              name="country"
              id="address_country"
            />
          </div>
          <div className="w-6/12">
            <InputSelect
              handleChange={onChangeState}
              options={states}
              label="State"
              placeholder="Select state"
              name="state"
              id="address_state"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <ComponentButton
            type="submit"
            loading={loading}
            className="w-full md:w-auto"
            text="Siguiente: Método de envío"
          />
        </div>
      </form>
    </>
  );
};

export default AddressForm;
