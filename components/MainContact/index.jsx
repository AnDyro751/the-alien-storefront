import ContactForm from "../ContactForm";

const MainContact = () => {
  return (
    <div className="w-11/12 mx-auto flex  space-x-12">
      <div className="w-4/12"></div>
      <div className="w-8/12">
          <ContactForm />
      </div>
    </div>
  );
};

export default MainContact;
