import { RowDataPacket } from "mysql2";
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

const insert = async (newUser: {
  email: string;
  password: string;
}): Promise<RowDataPacket | null> => {
  try {
    const result = await pool.query("INSERT INTO users SET ?", [newUser]);

    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  find,
  insert,
};
