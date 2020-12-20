const checkImageValidity = (type) => {
  let imageTypes = ["image/jpg", "image/jpeg", "image/png"];
  let check = false;
  imageTypes.forEach((imageType) => {
    type === imageType && (check = true);
  });
  return check;
};

export { checkImageValidity };
