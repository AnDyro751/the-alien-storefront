import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../src/stores/useOrder";
import isEmpty from "lodash/isEmpty";
import HeadersChangeCurrency from "../ChangeCurrency";
import HeadersChaneLocale from "../HeadersChaneLocale";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { BiCart, BiSearch } from "react-icons/bi";
import HeaderChangeOptions from "../../HeaderChangeOptions";
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
      <div className="w-2/12 relative">
        <div className="w-14 h-14 relative">
          <Link href={"/"}>
            <a title={t("storeName")}>
              <Image
                src="/images/logo.png"
                layout="fill"
                alt={`${t("storeName")} logo`}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="w-8/12 flex justify-center items-center space-x-12">
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
      <div className="w-2/12 flex justify-end items-center space-x-3">
        <div className="w-1/3 flex items-center justify-center">
          <HeaderChangeOptions />
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <Link href="/search">
            <a className="flex p-2" title={`${t("header.search_in_site")}`}>
              <BiSearch size={20} />
            </a>
          </Link>
        </div>
        <div className="w-1/3 ">
          <Link href="/">
            <a
              className="flex items-center p-2 justify-center"
              title={`${t("header.cart")}`}
            >
              <BiCart size={20} />
              &#160;&#160;({!isEmpty(order) ? order.attributes.item_count : 0})
            </a>
          </Link>
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
