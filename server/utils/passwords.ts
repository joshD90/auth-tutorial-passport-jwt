import * as bcrypt from "bcrypt";

import config from "../config";

const saltRounds = config.saltRounds;

export const generateHash = async (password: string): Promise<any> => {
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const compareHash = async (password: string, hash: string) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    return null;
  }
};
