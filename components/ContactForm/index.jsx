import Input from "../Input";
import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";
const ContactForm = () => {
  const [state, handleSubmit] = useForm("xoqyjdqk");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        state.succeeded = false;
      }, 2000);
      window.scrollTo(0, 0);
      document.querySelector("#contact_form").reset();
    }
  }, [state.succeeded]);

  return (
    <>
      {success && (
        <div
          className="w-full mb-8 bg-green-300 p-3 rounded shadow-lg cursor-pointer"
          onClick={() => {
            setSuccess(false);
          }}
        >
          <h2 className="text-green-900">
            Gracias por ponerte en contacto con nosotros.
          </h2>
        </div>
      )}

      <form
        id="contact_form"
        onSubmit={handleSubmit}
        className="w-full space-y-6"
      >
        <Input
          name="name"
          label="Name"
          id="contact_name"
          required
          placehoder="Full name"
        />
        <ValidationError prefix="name" field="name" errors={state.errors} />
        <Input
          label="E-mail"
          name="email"
          type="email"
          id="contact_email"
          placehoder="example@email.com"
          required
        />
        <ValidationError prefix="email" field="email" errors={state.errors} />

        <Input
          name="message"
          label="Message"
          id="contact_messahe"
          placehoder="Your message"
          required
          textarea
        />
        <div className="w-full">
          <button
            disabled={state.submitting}
            className={`bg-black px-8 py-3 rounded text-white focus:outline-none ${
              state.submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
