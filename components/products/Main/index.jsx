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
import { useEffect, useMemo, useState } from "react";
import getVariants from "../../../src/lib/getVariants.js";
import SelectProductVariant from "../../SelectProductVariant/index.jsx";
import SocialShare from "../../SocialShare/index.jsx";
import dynamic from 'next/dynamic';
import ShippingInfo from "../../ShippingInfo/index.jsx";
import PaymentOptions from "../../PaymentOptions/index.jsx";
// import ProductGallery from "../../ProductGallery/index.jsx";
const ProductGallery = dynamic(()=> import("../../ProductGallery/index.jsx"))
const MainProduct = ({ product, data }) => {
  const { t } = useTranslation("common");
  const allVariants = getVariants(data.included || [], "variant");
  const [variants, setVariants] = useState(allVariants);
  const [currentPrice, setCurrentPrice] = useState({});
  const [optionTypes, setOptionTypes] = useState(
    getVariants(data.included || [], "option_type")
  );
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
      <div className="w-full flex mt-10 space-x-12">
        <div className="w-6/12">
          <ProductGallery images={getVariants(data.included || [], "image")} />
        </div>
        <div className="w-6/12">
          <h1 className="text-5xl mb-6 font-bold">{product.attributes.name}</h1>
          <h2 className="text-3xl mb-6 font-bold text-gray-800 flex items-center">
            {currentPrice?.attributes?.currency}{" "}
            {currentPrice?.attributes?.display_price}
            {currentPrice?.attributes?.display_compare_at_price && (
              <span className="ml-4 text-2xl text-red-700 line-through select-none">
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
    </>
  );
};
export default MainProduct;

MainProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
