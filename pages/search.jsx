import algoliasearch from "algoliasearch/lite";
import {InstantSearch, SearchBox, connectHits} from "react-instantsearch-dom";
import HitSearchComponent from "../components/HitSearchComponent";
import MainLayout from "../components/Layouts/Main";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const SearchPage = ({locale}) => {
    const [searchState, setSearchState] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("q");
        setSearchState({
            query: myParam,
        });
    }, []);

    const {t} = useTranslation("common");

    const onChange = (e) => {
        setSearchState({
            query: e.query,
        });
        if (e.query?.length > 0) {
            window.history.replaceState(null, null, `?q=${e.query}`);
        } else {
            var clean_uri =
                location.protocol + "//" + location.host + location.pathname;
            window.history.pushState(null, null, clean_uri);
        }
    };

    const CustomHits = connectHits(Hits);

    return (
        <MainLayout>
            <div className="w-11/12 mx-auto">
                <h1 className="mt-10 mb-16 text-center font-bold text-4xl">
                    {t("header.search_in_site")}
                </h1>
                {loaded && (
                    <InstantSearch
                        searchClient={searchClient}
                        indexName="products"
                        searchState={searchState}
                        onSearchStateChange={onChange}
                    >
                        <SearchBox/>
                        <CustomHits/>
                    </InstantSearch>
                )}
            </div>
        </MainLayout>
    );
};

const Hits = ({hits}) => {
    return (
        <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {hits.map((hit, i) => (
                <HitSearchComponent hit={hit} key={i}/>
            ))}
        </div>
    );
};

export async function getServerSideProps({req, locale, query}) {
    return {
        props: {
            locale: locale,
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

export default SearchPage;
