import { pool } from "..";
import { UsersTable, MysqlResponse } from "../models";

const find = async (column: string, value: string) => {
  try {
    const [result] = await pool.query("SELECT * FROM users WHERE ?? = ?", [
      column,
      value,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const insert = () => pool.query("", []);

export default {
  find,
  insert,
};
