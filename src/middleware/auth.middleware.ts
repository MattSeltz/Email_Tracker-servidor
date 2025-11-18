// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      error: "No autorizado",
      message: "Token no encontrado",
    });
    return;
  }

  next();
};
