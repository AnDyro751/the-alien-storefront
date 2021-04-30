import getVariants from "./getVariants";
import includes from "lodash/includes";
const getImagesFromIncluded = (included, data) => {
  let allImages = getVariants(included, "image");
  let imagesId = data.map((a) => a.id);
  let filteredImages = allImages.filter((el) => includes(imagesId, el.id));
  return filteredImages || [];
};

export default getImagesFromIncluded;
