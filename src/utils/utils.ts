import bcrypt from "bcryptjs"
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

export const hashPassword = async (password:string):Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  return pass;
};

export const compare = async(pass:string,hashed:string):Promise<boolean> => {
return  bcrypt.compare(pass,hashed);
}