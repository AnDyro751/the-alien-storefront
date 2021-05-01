const getProductImages = (images = []) => {
  if (images.length > 0) {
    return images;
  } else {
    return [
      {
        attributes: {
          styles: [{ url: "v1619814915/No_Image_Available_u4ymnm.jpg" }],
        },
      },
    ];
  }
};

export default getProductImages;
