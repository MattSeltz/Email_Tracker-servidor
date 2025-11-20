"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const router = (0, express_1.Router)();
router.post("/login", auth_1.login);
router.post("/register", auth_1.register);
router.post("/logout", auth_1.logout);
exports.default = router;
