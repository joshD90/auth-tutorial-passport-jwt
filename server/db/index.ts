import mysql from "mysql2";
import config from "../config";

const poolConfig = mysql.createPool(config.db);
export const pool = poolConfig.promise();

import users from "./queries/users";

export default { users };
