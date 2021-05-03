/**
 * Copyright (c) 2021 Angel Mendez - Anture
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FaUnlockAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useTranslation } from "next-i18next";
const ShippingInfo = () => {
  const { t } = useTranslation("common");
  return (
    <div className="w-full mt-4 md:mt-8 space-y-4 md:space-y-8">
      <div className="w-full flex items-center space-x-4">
        <FaUnlockAlt className="text-gray-800" />
        &#160;
        <p className="text-gray-800 text-sm">{t("shipping.secure")}</p>
      </div>
      <div className="w-full flex items-center space-x-4">
        <MdLocalShipping size={20} className="text-gray-800" />
        &#160;
        <p className="text-gray-800 text-sm">{t("shipping.secure")}</p>
      </div>
    </div>
  );
};

export default ShippingInfo;
