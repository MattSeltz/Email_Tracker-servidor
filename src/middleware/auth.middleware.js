"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
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
exports.authMiddleware = authMiddleware;
