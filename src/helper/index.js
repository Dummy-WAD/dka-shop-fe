export const getUniqueFileName = (file, id) => {
  const extension = file.name.split(".").pop();
  const fileName = file.name.replace(`.${extension}`, "");
  return `${fileName}_${id}.${extension}`;
};

export const formatPrice = (price) => {
  return `$ ${Number(price).toFixed(2)}`;
}