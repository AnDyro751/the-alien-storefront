import { useTranslation } from "next-i18next";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../src/stores/useOrder";
import isEmpty from "lodash/isEmpty";
import HeadersChangeCurrency from "../ChangeCurrency";
const MainHeader = ({}) => {
  const { t } = useTranslation("common");
  const { state, dispatch } = useContext(OrderContext);
  let { order } = state;
  return (
    <div className="w-full flex items-center">
      <div className="w-2/12">{t("storeName")}</div>
      <div className="w-10/12 flex justify-end">
        <HeadersChangeCurrency />
        Carrito ({!isEmpty(order) ? order.attributes.item_count : 0})
      </div>
    </div>
  );
};
export default MainHeader;
