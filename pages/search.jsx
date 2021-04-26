import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import HitSearchComponent from "../components/HitSearchComponent";
import MainLayout from "../components/Layouts/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  "2PNNXA5CB2",
  "ea8ab7ea3c49cfb53c1e827644fd6502"
);

const SearchPage = () => {
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

  const { t } = useTranslation("common");
  
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
            <SearchBox />
            <CustomHits />
          </InstantSearch>
        )}
      </div>
    </MainLayout>
  );
};

const Hits = ({ hits }) => {
  console.log(hits);
  return (
    <div className="flex">
      {hits.map((hit, i) => (
        <HitSearchComponent hit={hit} key={i} />
      ))}
    </div>
  );
};

export async function getServerSideProps({ req, locale, query }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default SearchPage;
