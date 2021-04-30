const getImageUrl = (image, transforms = null) => {
  return `https://res-1.cloudinary.com/healthbox/image/upload/${
    transforms ? `${transforms}/${image}` : image
  }`;
};

export default getImageUrl;
