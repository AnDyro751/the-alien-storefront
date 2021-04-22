import Head from "next/head";
import client from "../src/client";

export default function Home({products}) {
  console.log(products)
  return (
    <div>
      <Head>
        <title>The alien store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export async function getStaticProps() {
  const res = await client.products.list({ page: 1 });
  console.log(res.success(), res.isFail());
  return {
    props: {
      products: res.isFail() ? [] : res.success(),
    },
  };
}
