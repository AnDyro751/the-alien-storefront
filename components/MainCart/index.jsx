import getVariants from "../../src/lib/getVariants";
import CartInfo from "../Cart/CartInfo";
import CartProduct from "../Cart/Product";
import CartStepper from "../CartStepper";

const MainCart = ({ data }) => {
  return (
    <div className="w-full">
      <div className="w-full py-20">
        <CartStepper />
      </div>
      <div className="w-11/12 mx-auto">
        <div className="w-full space-y-4">
          {getVariants(data.included, "line_item").map((line_item, i) => (
            <CartProduct data={line_item} key={i} />
          ))}
        </div>
        <CartInfo data={data.data.attributes} />
      </div>
    </div>
  );
};

export default MainCart;
