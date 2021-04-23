import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "../../../src/stores/useLocale";
import includes from "lodash/includes";
import setCookie from "../../../src/lib/setCookie";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
const HeadersChaneLocale = ({}) => {
  const { state, dispatch } = useContext(LocaleContext);
  const [locale, setLocale] = useState("en");
  const router = useRouter();
  const { t } = useTranslation("common");


  useEffect(() => {
    setLocale(state.locale);
  }, [state.locale]);

  const handleChange = (e) => {
    if (includes(["es", "en"], e.target.value)) {
      setLocale(e.target.value);
      setCookie("NEXT_LOCALE", e.target.value, 30);
      dispatch({ type: "UPDATE_LOCALE", payload: { locale: e.target.value } });
      router.push(router.pathname, router.pathname, { locale: e.target.value });
    }
  };

  return (
    <div className="w-full">
      <select
        className="tw-select block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        value={locale}
        onChange={handleChange}
      >
        <option value="es">{t("header.locale.spanish")}</option>
        <option value="en">{t("header.locale.english")}</option>
      </select>
    </div>
  );
};

export default HeadersChaneLocale;
