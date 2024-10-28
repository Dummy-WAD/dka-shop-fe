export const getUniqueFileName = (file, id) => {
  const extension = file.name.split(".").pop();
  const fileName = file.name.replace(`.${extension}`, "");
  return `${fileName}_${id}.${extension}`;
};
