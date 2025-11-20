"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const configs_1 = require("../configs/configs");
exports.pool = new pg_1.Pool({
    host: configs_1.HOST,
    database: configs_1.DATABASE,
    port: Number(configs_1.DB_PORT),
    user: configs_1.USER,
    password: configs_1.PASSWORD,
});
