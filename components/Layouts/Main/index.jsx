import MainHeader from "../../Headers/Main";
import PropTypes from "prop-types";
import {NextSeo} from "next-seo";
import {useTranslation} from "next-i18next";
import Footer from "../../Footer";

function MainLayout({children, transparentHeader, forceLoad}) {
    const {t} = useTranslation("common");

    return (
        <>
            <NextSeo title={t("storeName")} description={t("storeDescription")}/>
            <div className="w-full">
                <MainHeader forceLoad={forceLoad} transparent={transparentHeader}/>
                <main className="mt-20">
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default MainLayout;

MainLayout.propTypes = {
    transparentHeader: PropTypes.bool.isRequired,
    forceLoad: PropTypes.bool.isRequired
};

MainLayout.defaultProps = {
    transparentHeader: false,
    forceLoad: false
};
