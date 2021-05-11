import MainLayout from "../../components/Layouts/Main";
import MainSuccess from "../../components/Cart/MainSuccess";
import PropTypes from 'prop-types';
import client from "../../src/client";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import getCookie from "../../src/lib/getCookie";
import {COOKIE_CURRENCY_NAME} from "../../src/lib/apiConstants";

const PageSuccess = ({payment_type}) => {
    return (
        <MainLayout>
            <MainSuccess payment_type={payment_type}/>
        </MainLayout>
    )
}

export async function getServerSideProps({locale, req, query}) {
    console.log(query, "QUEWRY")
    if (!query.order_number) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            payment_type: query.payment_id ? "mercadopago" : "stripe",
            // data: res.success().data,
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}


export default PageSuccess