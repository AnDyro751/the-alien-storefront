/**
 * Copyright (c) 2021 Angel Mendez - Anture
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import {FaUnlockAlt} from 'react-icons/fa'
import { useTranslation } from "next-i18next";
 const ShippingInfo = () => {
    const { t } = useTranslation("common");
     return(
         <div className="w-full mt-8" >
             <div className="w-full flex items-center space-x-4" >
                 <FaUnlockAlt className="text-gray-800" />&#160;
                 <p className="text-gray-800" >{t("shipping.secure")}</p>
             </div>
         </div>
     )
 }

export default ShippingInfo