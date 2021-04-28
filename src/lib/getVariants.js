const getVariants = (data, type = "") => {
  if (data.length > 0) {
    let all = data.filter((el) => el.type === type);
    return all || [];
  } else {
    return [];
  }
};

export default getVariants;
