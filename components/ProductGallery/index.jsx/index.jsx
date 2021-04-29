import Image from "next/image";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import nProgress from "nprogress";
const ProductGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleClick = (image) => {
    setCurrentImage(image);
    nProgress.set(.3);
    setTimeout(() => {
      nProgress.done();
    }, 350);
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full bg-gray-200 rounded">
        <div className="h-xxl relative">
          <Image
            layout="fill"
            objectFit="cover"
            className="rounded shadow-sm bg-gray-200"
            quality={70}
            src={currentImage.attributes?.styles[0].url}
          />
        </div>
      </div>
      <div className="w-full mt-10 flex flex-wrap">
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => handleClick(image)}
            className="w-20 h-20 rounded cursor-pointer mr-4 mb-4 bg-gray-200 image-product-container"
          >
            <Image
              layout="fixed"
              objectFit="cover"
              quality={40}
              width={40}
              height={40}
              src={image.attributes?.styles[0].url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductGallery;
