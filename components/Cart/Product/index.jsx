import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import Input from "../../Input";
import Link from "next/link";
const CartProduct = ({ data, handleDelete }) => {
  const { t } = useTranslation("common");

  const handleDeleteProduct = () => {
    handleDelete(data);
  };

  return (
    <div className="w-full flex items-center space-x-4">
      <div className="w-9/12 flex items-center space-x-4">
        <div className="h-20 w-20 bg-gray-200 animate-pulse rounded shadow"></div>
        <div>
          <p className="font-medium text-lg text-gray-900">
            <Link href={`/products/${data.attributes?.slug}`}>
              <a>{data.attributes?.name}</a>
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-800">
            {data.attributes?.display_total} {data.attributes?.currency}
          </p>
          {data.attributes?.options_text && (
            <p className="mt-2 text-sm text-gray-600">
              {data.attributes?.options_text}
            </p>
          )}
        </div>
      </div>
      <div className="w-3/12 flex items-center space-x-4">
        <div className="w-3/4 flex justify-center">
          <Input
            defaultValue={data.attributes?.quantity}
            className="text-center w-full"
            type="number"
            id={`cart_${data.attributes.id}_quantity`}
            name={`cart_${data.attributes.id}_quantity`}
          />
        </div>
        <div className="w-1/4 flex justify-end">
          <div
            onClick={handleDeleteProduct}
            title={`${t("delete_product")}`}
            className="h-10 w-10 cursor-pointer rounded bg-white transition duration-300 hover:text-white hover:bg-red-600 flex justify-center items-center"
          >
            <BsTrash className="text-current fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};
CartProduct.propTypes = {
  data: PropTypes.object.isRequired,
};
CartProduct.defaultProps = {
  data: {},
};

export default CartProduct;
