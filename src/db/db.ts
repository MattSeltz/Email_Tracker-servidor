import { Pool } from "pg";

import { HOST, DATABASE, USER, PORT, PASSWORD } from "../configs/configs";

export const pool = new Pool({
  host: HOST,
  database: DATABASE,
  port: Number(PORT),
  user: USER,
  password: PASSWORD,
});
