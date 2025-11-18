import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { pool } from "../db/db";

import { JWT_SECRET, ENVIRONMENT } from "../config/config";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows[0]) {
      res.status(500).json({ error: "El usuario ya existe, inicia sesión" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const rows2 = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
      );

      res.json(rows2.rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows[0]) {
      const isMatchPassword = await bcrypt.compare(password, rows[0].password);

      if (isMatchPassword) {
        const token = jwt.sign({ email: rows[0].email }, JWT_SECRET as string, {
          expiresIn: "1h",
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: ENVIRONMENT === "production",
          sameSite: ENVIRONMENT === "developer" ? "lax" : "none",
          maxAge: 60 * 60 * 1000,
        });

        res.json({ messsage: "OK!" });
      } else {
        res.status(500).json({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(500).json({ error: "El usuario no existe, registrate" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: ENVIRONMENT === "production",
    sameSite: ENVIRONMENT === "developer" ? "lax" : "none",
    maxAge: 60 * 60,
  });

  res.json({ message: "OK!" });
};
