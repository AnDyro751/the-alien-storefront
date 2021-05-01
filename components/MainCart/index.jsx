import getVariants from "../../src/lib/getVariants";
import CartProduct from "../Cart/Product";
import CartStepper from "../CartStepper";

const MainCart = ({ data }) => {
  console.log(data, "DATA");
  return (
    <div className="w-full">
      <div className="w-full py-20">
        <CartStepper />
      </div>
      <div className="w-11/12 mx-auto space-y-4">
        {getVariants(data.included, "line_item").map((line_item, i) => (
          <CartProduct data={line_item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MainCart;
