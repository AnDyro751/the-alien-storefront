import image from "next/image";
import Image from "next/image";
const ProductGallery = ({ images }) => {
  console.log("IMAGEs", images);
  return (
    <div className="w-full bg-gray-200 shadow-sm rounded h-xxl">
      <div className="h-full relative">
        <Image
        layout="responsive"
          className="h-xxl"
          objectFit="cover"
          quality={70}
          width={700}
          height={700}
          src={images[0].attributes.styles[0].url}
        />
      </div>
    </div>
  );
};
export default ProductGallery;
