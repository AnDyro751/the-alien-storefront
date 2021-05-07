import MainLayout from "../../components/Layouts/Main";
import MainSuccess from "../../components/Cart/MainSuccess";
import PropTypes from 'prop-types';
import client from "../../src/client";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import getCookie from "../../src/lib/getCookie";
import {COOKIE_CURRENCY_NAME} from "../../src/lib/apiConstants";

const PageSuccess = ({}) => {
    return (
        <MainLayout>
            <MainSuccess/>
        </MainLayout>
    )
}

export async function getServerSideProps({locale, req, query}) {
    if (!query.order_number) {
        return {
            redirect: "/",
            permanent: false
        }
    }

    return {
        props: {
            // data: res.success().data,
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}




export default PageSuccess