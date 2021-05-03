import { useTranslation } from "next-i18next";
import { BiPhone } from "react-icons/bi";
import { MdMailOutline } from "react-icons/md";
import dynamic from "next/dynamic";

// import ContactForm from "../ContactForm";
const ContactForm = dynamic(() => import("../ContactForm"));

const MainContact = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="w-full py-32 bg-indigo-300 shadow-md mb-10">
        <h1 className="text-5xl font-medium text-center text-gray-900">
          {t("contact.contact_us")}
        </h1>
      </div>
      <div className="w-11/12 mx-auto flex space-x-12 items-center">
        <div className="w-5/12">
          <h2 className="text-3xl font-bold text-gray-900">
            {t("contact.get_in_touch")}
          </h2>
          <h3 className="mt-4 text-gray-600 leading-7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            culpa dolores non distinctio animi facere eveniet fuga labore ea.
          </h3>
          <div className="w-full mt-4 flex items-center space-x-4">
            <div>
              <BiPhone className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-600">
                <a href="tel:555">(555) 123-1234</a>
              </p>
            </div>
          </div>
          <div className="w-full mt-4 flex items-center space-x-4">
            <div>
              <MdMailOutline className="text-gray-600" />
            </div>
            <div>
              <p className="text-gray-600">
                <a href="mailto:contact@alienstore.com">
                  contact@alienstore.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="w-7/12">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default MainContact;
