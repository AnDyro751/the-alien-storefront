import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";
const ContactAccess = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full relative h-72 shadow-sm bg-gray-200 rounded">
      <Image
        layout="fill"
        className="rounded"
        objectFit="cover"
        src="v1619752672/IMG_3367_xmosvo.jpg"
      />
      <div className="w-full z-20 absolute left-0 right-0 px-5 flex items-center bottom-0 top-0">
        <div className="w-full">
          <h4 className="text-3xl text-white font-medium">
            {t("contact.have_questions")}
          </h4>
          <div className="flex mt-8">
            <Link href="/contact">
              <a className="px-8 py-3 text-sm rounded-full bg-white text-black uppercase">
                {t("contact.contact_us")}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full z-10 absolute left-0 right-0 bottom-0 top-0 bg-black opacity-25"></div>
    </div>
  );
};

export default ContactAccess;
