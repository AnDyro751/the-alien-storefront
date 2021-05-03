const getRecord = (array, id) => {
  let element = array.find((el) => el.id === id);
  return element;
};

export default getRecord;
