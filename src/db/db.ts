import { Pool } from "pg";

import { HOST, DATABASE, USER, DB_PORT, PASSWORD } from "../configs/configs";

export const pool = new Pool({
  host: HOST,
  database: DATABASE,
  port: Number(DB_PORT),
  user: USER,
  password: PASSWORD,
});
