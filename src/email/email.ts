import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { transporter } from "../configs/nodemailer";
import { CLIENT } from "../configs/configs";
import { pool } from "../db/db";

// Almacenar códigos en memoria: { email: código }
const codes: Record<string, string> = {};

// ==========================================
// 1. ENVIAR CÓDIGO
// ==========================================

export const sendEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Guardar código
  codes[email] = code;

  // Borrar después de 15 minutos
  setTimeout(() => delete codes[email], 15 * 60 * 1000);

  try {
    await transporter.sendMail({
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
          <a href="${CLIENT}/verify/${code}?email=${email}" 
             style="display:inline-block;margin-top:20px;padding:12px 24px;background:#06b6d4;color:white;text-decoration:none;border-radius:6px;">
            Verificar código
          </a>
        </div>
      `,
    });

    res.json({ success: true, message: "Código enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar código" });
  }
};

// ==========================================
// 2. VERIFICAR CÓDIGO
// ==========================================

export const verifyCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { email } = req.query;

  if (codes[email as string] === code) {
    delete codes[email as string]; // Borrar código usado
    res.json({ valid: true, message: "Código correcto" });
  } else {
    res.status(400).json({ valid: false, error: "Código incorrecto" });
  }
};

// ==========================================
// 3. CAMBIAR CONTRASEÑA
// ==========================================

export const changePassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!rows[0]) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
      hashedPassword,
      email,
    ]);

    res.json({ success: true, message: "Contraseña actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cambiar contraseña" });
  }
};
