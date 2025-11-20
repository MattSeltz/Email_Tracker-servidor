"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../email/email");
const router = (0, express_1.Router)();
router.get("/verify-code/:code", email_1.verifyCode);
router.post("/send-email", email_1.sendEmail);
router.post("/update-password", email_1.changePassword);
exports.default = router;
