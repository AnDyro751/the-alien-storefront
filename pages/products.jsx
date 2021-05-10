import MainLayout from "../components/Layouts/Main";
import MainProducts from "../components/MainProducts";
import client from "../src/client";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import getCookieOrder from "../src/lib/getCookieOrder";

const PageProducts = ({data}) => {
    return (
        <MainLayout>
            <MainProducts data={data}/>
        </MainLayout>
    )
}


export async function getServerSideProps({locale, req}) {
    const cookieOrder = getCookieOrder(req?.headers?.cookie || "");
    if (!cookieOrder) {
        return {
            notFound: true
        }
    }
    const resProducts = await client.products.list({
        page: 1,
        include: "default_variant,images",
        fields: {
            image: "styles",
            product:
                "name,description,slug,meta_description,images,meta_keywords,purchasable,currency,display_price,display_compare_at_price",
        },
    });
    if (resProducts.isFail()) {
        console.log(resProducts.fail(), "FAIL RES PRODUCTS");
        return {
            notFound: true,
        };
    }
    return {
        props: {
            data: resProducts.success(),
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}


export default PageProducts