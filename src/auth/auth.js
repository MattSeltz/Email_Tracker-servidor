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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const configs_1 = require("../configs/configs");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { rows } = yield db_1.pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (rows[0]) {
            res.status(500).json({ error: "El usuario ya existe, inicia sesión" });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const rows2 = yield db_1.pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
            res.json(rows2.rows);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { rows } = yield db_1.pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (rows[0]) {
            const isMatchPassword = yield bcrypt_1.default.compare(password, rows[0].password);
            if (isMatchPassword) {
                const token = jsonwebtoken_1.default.sign({ email: rows[0].email }, configs_1.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: configs_1.ENVIRONMENT === "production",
                    sameSite: configs_1.ENVIRONMENT === "developer" ? "lax" : "none",
                    maxAge: 60 * 60 * 1000,
                });
                res.json({ messsage: "OK!", id: rows[0].id });
            }
            else {
                res.status(500).json({ error: "Contraseña incorrecta" });
            }
        }
        else {
            res.status(500).json({ error: "El usuario no existe, registrate" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: configs_1.ENVIRONMENT === "production",
        sameSite: configs_1.ENVIRONMENT === "developer" ? "lax" : "none",
        maxAge: 60 * 60,
    });
    res.json({ message: "OK!" });
};
exports.logout = logout;
