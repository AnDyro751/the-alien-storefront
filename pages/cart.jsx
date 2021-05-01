import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../components/Layouts/Main";
import MainCart from "../components/MainCart";

const CartPage = () => {
  return(
    <MainLayout>
      <MainCart />
    </MainLayout>
  )
};

export default CartPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "cart"])),
    },
  };
}
