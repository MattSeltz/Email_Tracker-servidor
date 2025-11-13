import { Pool } from "pg";

import { HOST, DATABASE, USER, PORT, PASSWORD } from "../config/config";

export const pool = new Pool({
  host: HOST,
  database: DATABASE,
  port: Number(PORT),
  user: USER,
  password: PASSWORD,
});
