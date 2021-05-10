import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MainLayout from "../components/Layouts/Main";
import MainCart from "../components/MainCart";
import client from "../src/client";
import {COOKIE_CURRENCY_NAME, COOKIE_SPREE_ORDER} from "../src/lib/apiConstants";
import getCookie from "../src/lib/getCookie";
import withSession from "../src/lib/session";
import {parseCookies} from "nookies";

const CartPage = ({data}) => {
    return (
        <MainLayout>
            <MainCart data={data}/>
        </MainLayout>
    );
};


// export const getServerSideProps = withSession(async function ({req, res, locale}) {
//     const user = req.session.get('user')
//
//     console.log("USER", user)
//
//     return {
//         props: {
//             user: req.session.get('user') || null,
//             ...(await serverSideTranslations(locale, ["common", "cart"])),
//         },
//     }
// })

export const getServerSideProps = async function (props) {
    const {locale, req, res, dataLocale} = props;
    console.log(req.headers, "HEADER");
    const cookieOrder = getCookie(req.headers.cookie || "", COOKIE_SPREE_ORDER)

    if (!cookieOrder) {
        return {
            notFound: true
        }
    }
    const responseCart = await client.cart.show(
        {
            orderToken: req
                ? req.headers
                    ? cookieOrder
                    : null
                : null,
        },
        {
            fields:
                "display_item_total,display_pre_tax_item_amount,display_pre_tax_total,display_ship_total,display_total,email",
            include: "line_items",
            currency: getCookie(req?.headers?.cookie || "", COOKIE_CURRENCY_NAME),
        }
    );
    if (responseCart.isFail()) {
        console.log(responseCart.fail(), "FAIL CART");
        return {
            notFound: true,
        };
    }
    return {
        props: {
            data: responseCart.success(),
            ...(await serverSideTranslations(locale, ["common", "cart"])),
        },
    };
}
export default CartPage;

