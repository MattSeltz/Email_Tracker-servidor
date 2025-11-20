import nodemailer from "nodemailer";

import { NODEMAILER_USER, NODEMAILER_PASS } from "./configs";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});
