"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIsSend = exports.deleteData = exports.putData = exports.postData = exports.getOneData = exports.getData = void 0;
const db_1 = require("../db/db");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const { rows } = yield db_1.pool.query("SELECT * FROM emails WHERE user_id = $1 ORDER BY id ASC", [userId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.getData = getData;
const getOneData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.pool.query("SELECT * FROM emails WHERE id = $1", [
            id,
        ]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.getOneData = getOneData;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, rubro, userId } = req.body;
    try {
        const { rows } = yield db_1.pool.query("INSERT INTO emails (email, rubro, user_id) VALUES ($1, $2, $3) ON CONFLICT (email, user_id) DO NOTHING", [email, rubro, userId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.postData = postData;
const putData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, rubro } = req.body;
    try {
        const { rows } = yield db_1.pool.query("UPDATE emails SET email = $1, rubro = $2 WHERE id = $3", [email, rubro, id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.putData = putData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield db_1.pool.query("DELETE FROM emails WHERE id = $1", [id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.deleteData = deleteData;
const updateIsSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { send } = req.body;
    try {
        const { rows } = yield db_1.pool.query("UPDATE emails SET send = $1 WHERE id = $2", [send, id]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.updateIsSend = updateIsSend;
