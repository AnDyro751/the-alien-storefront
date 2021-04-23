import { useContext, useEffect, useState } from "react";
import { LocaleContext } from "../../../src/stores/useLocale";
import includes from "lodash/includes";
import setCookie from "../../../src/lib/setCookie";
import { useRouter } from "next/router";
const HeadersChaneLocale = ({}) => {
  const { state, dispatch } = useContext(LocaleContext);
  const [locale, setLocale] = useState("en");
  const router = useRouter();

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
      <select value={locale} onChange={handleChange}>
        <option value="es">Español</option>
        <option value="en">Inglés</option>
      </select>
    </div>
  );
};

export default HeadersChaneLocale;
