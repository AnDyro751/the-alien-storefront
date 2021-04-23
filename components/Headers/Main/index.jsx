import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../src/stores/useOrder";
import isEmpty from "lodash/isEmpty";
import HeadersChangeCurrency from "../ChangeCurrency";
import HeadersChaneLocale from "../HeadersChaneLocale";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
const MainHeader = ({ transparent }) => {
  const [transparentHeader, setTransparent] = useState(transparent);
  const { t } = useTranslation("common");
  const { state, dispatch } = useContext(OrderContext);
  let { order } = state;

  const mainHeaderClass = classnames({
    "flex items-center py-3 w-11/12 mx-auto": true,
    "bg-white": !transparent,
  });

  return (
    <div className={mainHeaderClass}>
      <div className="w-2/12">{t("storeName")}</div>
      <div className="w-6/12 flex justify-center items-center space-x-12">
        <div className="">
          <Link href={"/"}>
            <a
              className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent"
              href=""
            >
              {t("header.links.home")}
            </a>
          </Link>
        </div>
        <div className="">
          <Link href={"/"}>
            <a
              className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent"
              href=""
            >
              {t("header.links.merch")}
            </a>
          </Link>
        </div>
        <div className="">
          <Link href={"/"}>
            <a
              className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent"
              href=""
            >
              {t("header.links.dolls")}
            </a>
          </Link>
        </div>
        <div className="">
          <Link href={"/"}>
            <a
              className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent"
              href=""
            >
              {t("header.links.contact")}
            </a>
          </Link>
        </div>
      </div>
      <div className="w-4/12 flex justify-end items-center space-x-3">
        <div className="w-1/3">
          <HeadersChangeCurrency />
        </div>
        <div className="w-1/3">
          <HeadersChaneLocale />
        </div>
        <div className="w-1/3">
          Carrito ({!isEmpty(order) ? order.attributes.item_count : 0})
        </div>
      </div>
    </div>
  );
};
export default MainHeader;

MainHeader.propTypes = {
  transparent: PropTypes.bool.isRequired,
};
MainHeader.defaultProps = {
  transparent: false,
};
