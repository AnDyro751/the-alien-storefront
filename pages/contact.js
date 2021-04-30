import MainLayout from "../components/Layouts/Main";
import MainContact from "../components/MainContact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ContactPage = () => {
  return (
    <MainLayout>
      <MainContact />
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default ContactPage;
