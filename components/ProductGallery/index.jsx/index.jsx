import Image from "next/image";
import "react-slideshow-image/dist/styles.css";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import nProgress from "nprogress";
import "react-bnb-gallery/dist/style.css";
import ReactBnbGallery from "react-bnb-gallery";
import getImageUrl from "../../../src/lib/getImageUrl";

const ProductGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleClick = (image) => {
    if (image.id != currentImage.id) {
      setCurrentImage(image);
      showLoader();
    }
  };

  const showLoader = () => {
    nProgress.set(0.3);
    setTimeout(() => {
      nProgress.done();
    }, 350);
  };

  const handleBefore = () => {
    let element = images.findIndex((el) => el.id === currentImage.id);
    showLoader();
    if ((element || 0) != 0) {
      let newImage = element - 1;
      setCurrentImage(newImage > 0 ? images[newImage] : images[0]);
    } else {
      setCurrentImage(images[images.length - 1]);
    }
  };

  const handleNext = () => {
    let element = images.findIndex((el) => el.id === currentImage.id);
    showLoader();
    if (element != images.length - 1) {
      let newImage = element + 1;
      if (newImage <= images.length - 1) {
        setCurrentImage(images[newImage]);
      } else {
        setCurrentImage(images[0]);
      }
    } else {
      setCurrentImage(images[0]);
    }
  };

  const getImages = () => {
    const newImages = [];
    images.map((image, i) => {
      newImages.push({
        photo: getImageUrl(
          image.attributes?.styles[0].url,
          "w_1000,h_1000,c_fill,q_75"
        ),
        thumbnail: getImageUrl(
          image.attributes?.styles[0].url,
          "w_100,h_100,c_fill"
        ),
        number: i + 1,
      });
    });
    return newImages;
  };

  console.log(getImages());

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ReactBnbGallery
        show={isOpen}
        photos={getImages()}
        onClose={() => setIsOpen(false)}
      />
      <div className="w-full relative">
        <div className="relative w-full bg-gray-200 rounded">
          <div className="h-xxl relative cursor-pointer" onClick={handleOpen}>
            <Image
              layout="fill"
              objectFit="cover"
              className="rounded shadow-sm bg-gray-200"
              quality={70}
              src={currentImage.attributes?.styles[0].url}
            />
            <div
              onClick={handleBefore}
              className="absolute select-none bg-transparent items-center justify-center flex transition duration-150 hover:bg-black left-2 cursor-pointer bottom-0 top-0 m-auto rounded-full h-14 w-14"
            >
              <FaAngleLeft size={22} className="text-white" />
            </div>
            <div
              onClick={handleNext}
              className="absolute select-none bg-transparent items-center justify-center flex transition duration-150 hover:bg-black right-2 cursor-pointer bottom-0 top-0 m-auto rounded-full h-14 w-14"
            >
              <FaAngleRight size={22} className="text-white" />
            </div>
          </div>
        </div>
        <div className="w-full mt-10 flex flex-wrap">
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => handleClick(image)}
              className={`w-20 h-20 rounded cursor-pointer mr-4 mb-4 bg-gray-200 image-product-container ${
                currentImage.id === image.id
                  ? "border-black"
                  : "border-transparent"
              } border-2`}
            >
              <Image
                layout="fixed"
                objectFit="cover"
                quality={75}
                width={80}
                height={80}
                src={image.attributes?.styles[0].url}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductGallery;
