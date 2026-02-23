interface IValidateData {
  [key: string]: any;
}

export const validateData = (
  reqData: IValidateData,
  data: IValidateData,
): boolean => {
  let isValidate: boolean = false;
  const dataKeys: string[] = Object.keys(data);

  for (const key of dataKeys) {
    isValidate = Object.hasOwn(reqData, key);

    if (!isValidate) {
      return isValidate;
    }
  }

  return isValidate;
};
