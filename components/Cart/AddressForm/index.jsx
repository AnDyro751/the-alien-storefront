import Input from "../../Input";
import InputSelect from "../../InputSelect";
import { useFormik } from "formik";
import ComponentButton from "../../Button";
import client from "../../../src/client";
import { useState } from "react";

const AddressForm = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const validate = (values) => {
    const errors = {};
    // name
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 40) {
      errors.name = "Please enter a shorter name";
    } else if (values.name.length <= 1) {
      errors.name = "Please enter a longer name";
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
      email: "",
      address: "",
      city: "",
      cp: "",
    },
    onSubmit: (values) => {
      handleUpdateAddress();
    },
    validate: validate,
  });

  const handleUpdateAddress = async () => {
    const response = await client.checkout.orderUpdate(
      {
        orderToken: getCookie(document.cookie, COOKIE_SPREE_ORDER),
      },
      {
        order: {
          ship_address_attributes: {
            firstname: formik.values.name,
            // lastname: "Snow",
            address1: formik.values.address,
            city: formik.values.city,
            // phone: "3014445002",
            zipcode: formik.values.cp,
            state_name: "MD",
            country_iso: selectedCountry,
          },
        },
      }
    );
  };

  const onChangeCountry = async (e) => {
    setSelectedCountry(e.target.value || "");
    const response = await client.countries.show(e.target.value, {
      include: "states",
    });

    if (response.isSuccess()) {
      console.log(response.success(), "Country");
    } else {
      showToast("Ha ocurrido un error al buscar el país");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        error={formik.touched.name ? formik.errors.name : null}
        name="name"
        id="address_name"
        label="Name"
        placehoder="David Smith"
        required
        handleChange={formik.handleChange}
      />
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
      <div className="w-full">
        <InputSelect
          handleChange={onChangeCountry}
          options={countries}
          label="Country"
          placeholder="Select country"
          name="country"
          id="address_country"
        />
      </div>
      <div className="mt-8 flex justify-end">
        <ComponentButton
          loading={formik.isSubmitting}
          className="w-full md:w-auto"
          text="Siguiente: Método de envío"
          // handleClick={onClickNext}
        />
      </div>
    </form>
  );
};

export default AddressForm;
