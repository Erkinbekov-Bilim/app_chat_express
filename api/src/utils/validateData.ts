interface IValidateData {
  [key: string]: any;
}

export const validateData = (
  reqData: IValidateData,
  keys: string[],
): boolean => {
  if (typeof reqData !== 'object' || reqData === null) {
    return false;
  }

  for (const key of keys) {
    if (!Object.hasOwn(reqData, key)) {
      return false;
    }

    const value: string = reqData[key];
    if (typeof value !== 'string' || value.trim().length === 0) {
      return false;
    }
  }
  return true;
};
