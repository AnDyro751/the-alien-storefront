import Image from "next/image";
import { useState } from "react";
import getImageUrl from "../../../src/lib/getImageUrl";
import getProductImages from "../../../src/lib/getProductImages";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import s from "./ProductGallery.module.css";
const ProductGallery = ({ images, product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState(getProductImages(images));
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

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
        number: i,
      });
    });
    return newImages;
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="w-full relative">
        <div className="relative w-full h-96 md:h-xxl bg-white rounded">
          <div className="keen-slider h-full w-full" ref={sliderRef}>
            {currentImages.map((image, i) => (
              <div key={i} className="keen-slider__slide cursor-pointer">
                <Image
                  layout="fill"
                  objectFit={"cover"}
                  className="rounded shadow-sm bg-gray-200"
                  quality={70}
                  onClick={handleOpen}
                  alt={`${product.attributes?.name} image - ${product.attributes?.slug} photo alien store`}
                  src={image.attributes?.styles[0].url}
                />
              </div>
            ))}
          </div>
        </div>
        {slider && (
          <div className={s.dots}>
            {[...Array(slider.details().size).keys()].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider?.moveToSlideRelative(idx);
                  }}
                  className={`${s.dot} ${currentSlide === idx ? s.active : ""}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default ProductGallery;
