import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "../../../src/stores/useLocale";
import includes from "lodash/includes";
import setCookie from "../../../src/lib/setCookie";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
const HeadersChaneLocale = ({}) => {
  const { state, dispatch } = useContext(LocaleContext);
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale);
  const { t } = useTranslation("common");

  const handleChange = (e) => {
    if (includes(["es", "en"], e.target.value)) {
      setLocale(e.target.value);
      setCookie("NEXT_LOCALE", e.target.value, 30);
      dispatch({ type: "UPDATE_LOCALE", payload: { locale: e.target.value } });
      router.replace(router.asPath, null, { locale: e.target.value });
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
