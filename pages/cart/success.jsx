import MainLayout from "../../components/Layouts/Main";
import MainSuccess from "../../components/Cart/MainSuccess";
import PropTypes from 'prop-types';
import client from "../../src/client";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import getCookie from "../../src/lib/getCookie";
import {COOKIE_CURRENCY_NAME} from "../../src/lib/apiConstants";

const PageSuccess = ({data}) => {
    return (
        <MainLayout>
            <MainSuccess data={data}/>
        </MainLayout>
    )
}

export async function getServerSideProps({locale, req, query}) {
    // console.log(, "QUERY")
    if (!query.order_number) {
        return {
            redirect: "/",
            permanent: false
        }
    }
    const res = await client.order.status({
        orderToken: req
            ? req.headers
                ? getCookie(req.headers.cookie || "", "X-Spree-Order-Token")
                : null
            : null,
    }, query.order_number, {
        currency: getCookie(req?.headers?.cookie || "", COOKIE_CURRENCY_NAME),
    });
    if (res.isFail()) {
        console.log(res.fail(), "FAILS")
        return {
            notFound: true,
        };
    }
    return {
        props: {
            data: res.success().data,
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}


PageSuccess.propTypes = {
    data: PropTypes.object.isRequired
}

export default PageSuccess