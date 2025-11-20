import { Router } from "express";

import { changePassword, sendEmail, verifyCode } from "../email/email";

const router = Router();

router.get("/verify-code/:code", verifyCode);
router.post("/send-email", sendEmail);
router.post("/update-password", changePassword);

export default router;
