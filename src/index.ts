import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { CLIENT, SERVER_PORT } from "./config/config";

import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(
  cors({
    origin: CLIENT,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send(`<h1>Email Tracker</h1>`);
});

app.use("/email", emailRoutes);
app.use("/auth", authRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`)
);
