import { useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../src/stores/useOrder";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { BiCart, BiSearch } from "react-icons/bi";
import dynamic from "next/dynamic";
import throttle from "lodash/throttle";
import { HiOutlineMenu } from "react-icons/hi";
const HeaderChangeOptions = dynamic(() => import("../../HeaderChangeOptions"), {
  ssr: false,
});
const MainHeader = ({ transparent }) => {
  const { t } = useTranslation("common");
  const { state, dispatch } = useContext(OrderContext);
  const [withBorder, setWithBorder] = useState(false);

  let { order } = state;

  const mainHeaderClass = classnames({
    "main-header transition duration-150 fixed top-0 left-0 right-0 w-full z-50 h-20": true,
    "main-header-shadow": withBorder,
  });

  useEffect(() => {
    var throttled = throttle(setHeader, 400);
    document.addEventListener("scroll", throttled);
    return () => document.removeEventListener("scroll", throttled);
  }, []);

  const setHeader = () => {
    if (window.scrollY > 50) {
      setWithBorder(true);
    } else {
      setWithBorder(false);
    }
  };

  return (
    <div className={mainHeaderClass}>
      <div className="w-11/12 items-center py-3 mx-auto flex">
        <div className="w-6/12 md:w-2/12 relative">
          <div className="relative w-14 h-14">
            <Link href={"/"}>
              <a title={t("storeName")}>
                <Image
                  src="/v1619713027/logo_dbptcg.png"
                  layout="fill"
                  objectFit="cover"
                  className="w-14 h-14"
                  quality={30}
                  alt={`${t("storeName")} logo`}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-8/12 hidden md:flex justify-center items-center space-x-12">
          <div className="">
            <Link href={"/"}>
              <a className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent">
                {t("header.links.home")}
              </a>
            </Link>
          </div>
          <div className="">
            <Link href={"/"}>
              <a className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent">
                {t("header.links.merch")}
              </a>
            </Link>
          </div>
          <div className="">
            <Link href={"/"}>
              <a className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent">
                {t("header.links.dolls")}
              </a>
            </Link>
          </div>
          <div className="">
            <Link href={"/contact"}>
              <a className="w-auto px-4 py-2 hover:border-black border-b-2 border-transparent">
                {t("header.links.contact")}
              </a>
            </Link>
          </div>
        </div>
        <div className="w-6/12 md:w-2/12 flex justify-end items-center space-x-3">
          <div className="w-1/3 hidden md:flex items-center justify-center">
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
            <Link href="/cart">
              <a
                className="flex items-center p-2 justify-center"
                title={`${t("header.cart")}`}
              >
                <BiCart size={20} />
                &#160;&#160;({!isEmpty(order) ? order.attributes.item_count : 0}
                )
              </a>
            </Link>
          </div>
          <div className="w-1/3 flex md:hidden items-center justify-center">
            <HiOutlineMenu size={20} />
          </div>
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
