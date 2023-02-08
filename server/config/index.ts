import * as dotenv from "dotenv";
dotenv.config();

//config
export default {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  port: process.env.PORT,
  saltRounds: 12,
  jwt: { secret: process.env.JWT_SECRET },
};
