import { useTranslation } from "next-i18next";
import Head from "next/head";
import ProductsList from "../components/products/List";
import client from "../src/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../components/Layouts/Main";
export default function Home({ products, isSuccess }) {
  const { t } = useTranslation("common");
  return (
    <MainLayout>
      <div>
        <Head>
          <title>{t("storeName")}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isSuccess && <ProductsList products={products} />}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }) {
  const res = await client.products.list({ page: 1 });
  if (res.isFail()) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: res.success().data,
      isSuccess: res.isSuccess(),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
