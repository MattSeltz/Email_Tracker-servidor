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
exports.changePassword = exports.verifyCode = exports.sendEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("../configs/nodemailer");
const configs_1 = require("../configs/configs");
const db_1 = require("../db/db");
// Almacenar códigos en memoria: { email: código }
const codes = {};
// ==========================================
// 1. ENVIAR CÓDIGO
// ==========================================
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Guardar código
    codes[email] = code;
    // Borrar después de 15 minutos
    setTimeout(() => delete codes[email], 15 * 60 * 1000);
    try {
        yield nodemailer_1.transporter.sendMail({
            from: "'Email Tracker' <matiselt24@gmail.com>",
            to: email,
            subject: "Recupera tu cuenta",
            html: `
        <div style="font-family:Arial;max-width:600px;margin:0 auto;padding:20px;">
          <h2>Recupera tu cuenta</h2>
          <p>Tu código de verificación es:</p>
          <div style="font-size:32px;font-weight:bold;background:#f0f0f0;padding:20px;text-align:center;border-radius:8px;letter-spacing:5px;">
            ${code}
          </div>
          <p style="color:#666;margin-top:20px;">
            Este código expira en 15 minutos.
          </p>
          <a href="${configs_1.CLIENT}/verify/${code}?email=${email}" 
             style="display:inline-block;margin-top:20px;padding:12px 24px;background:#06b6d4;color:white;text-decoration:none;border-radius:6px;">
            Verificar código
          </a>
        </div>
      `,
        });
        res.json({ success: true, message: "Código enviado" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al enviar código" });
    }
});
exports.sendEmail = sendEmail;
// ==========================================
// 2. VERIFICAR CÓDIGO
// ==========================================
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { email } = req.query;
    if (codes[email] === code) {
        delete codes[email]; // Borrar código usado
        res.json({ valid: true, message: "Código correcto" });
    }
    else {
        res.status(400).json({ valid: false, error: "Código incorrecto" });
    }
});
exports.verifyCode = verifyCode;
// ==========================================
// 3. CAMBIAR CONTRASEÑA
// ==========================================
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const { rows } = yield db_1.pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (!rows[0]) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.pool.query("UPDATE users SET password = $1 WHERE email = $2", [
            hashedPassword,
            email,
        ]);
        res.json({ success: true, message: "Contraseña actualizada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al cambiar contraseña" });
    }
});
exports.changePassword = changePassword;
