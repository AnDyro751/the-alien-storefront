/**
 * Copyright (c) 2021 Angel Mendez - Anture
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import PropTypes from "prop-types";
import Breadcrumbs from "../../Breadcrumbs/index.jsx";
import { useTranslation } from "next-i18next";
import SelectProductQuantity from "../../SelectProductQuantity/index.jsx";
import { useMemo, useState } from "react";
import getVariants from "../../../src/lib/getVariants.js";
import SelectProductVariant from "../../SelectProductVariant/index.jsx";
import dynamic from "next/dynamic";

const SocialShare = dynamic(() => import("../../SocialShare/index.jsx"));
const ShippingInfo = dynamic(() => import("../../ShippingInfo/index.jsx"));
const PaymentOptions = dynamic(() => import("../../PaymentOptions/index.jsx"));
const ContactAccess = dynamic(() => import("../../ContactAccess/index.jsx"));
const ProductGallery = dynamic(() => import("../../ProductGallery/index.jsx"));

const MainProduct = ({ product, data }) => {
  const { t } = useTranslation("common");
  const allVariants = getVariants(data.included || [], "variant");
  const [variants, setVariants] = useState(allVariants);
  const [currentPrice, setCurrentPrice] = useState({});

  const [currentVariant, setCurrentVariant] = useState({});

  // Set current variant
  useMemo(() => {
    setCurrentPrice(allVariants.length > 0 ? allVariants[0] : product);
  }, [data]);

  const onHandleSelectVariant = (variant) => {
    // console.log(variant.attributes.display_price);
    setCurrentPrice(variant);
    setCurrentVariant(variant);
  };

  return (
    <>
      <div className="w-full">
        <Breadcrumbs
          keys={[
            { text: t("breadcrumbs.home"), href: "/" },
            { text: t("breadcrumbs.products"), href: "/products" },
            { text: product.attributes?.name, href: product.attributes.slug },
          ]}
        />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap mt-4 md:mt-10 space-x-0 md:space-x-12">
        <div className="w-full md:w-6/12">
          <ProductGallery
            product={product}
            images={getVariants(data.included || [], "image")}
          />
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-6/12">
          <h1 className="text-3xl md:text-5xl mb-4 md:mb-6 font-bold">
            {product.attributes.name}
          </h1>
          <h2 className="text-lg md:text-3xl mb-4 md:mb-6 font-bold text-gray-800 flex items-center">
            {currentPrice?.attributes?.currency}{" "}
            {currentPrice?.attributes?.display_price}
            {currentPrice?.attributes?.display_compare_at_price && (
              <span className="ml-4 text-base md:text-2xl text-red-700 line-through select-none">
                {currentPrice?.attributes?.display_compare_at_price}
              </span>
            )}
          </h2>
          <SelectProductVariant
            handleSelectVariant={onHandleSelectVariant}
            variants={variants}
          />
          {/* <SelectProductOptionTypes optionTypes={optionTypes} /> */}
          {product.attributes.description && (
            <h3 className="text-gray-800 font-normal">
              {product.attributes.description}
            </h3>
          )}
          <SelectProductQuantity variant={currentVariant} product={product} />
          <SocialShare />
          <ShippingInfo />
          <PaymentOptions />
        </div>
      </div>
      <div className="w-full mt-10 md:mt-20 flex flex-wrap md:flex-nowrap md:space-x-12">
        <div className="w-full md:w-8/12"></div>
        <div className="w-full md:w-4/12">
          <ContactAccess />
        </div>
      </div>
    </>
  );
};
export default MainProduct;

MainProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
