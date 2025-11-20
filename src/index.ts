import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { CLIENT, SERVER_PORT } from "./configs/configs";

import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";
import recoveryRoutes from "./routes/recovery.routes";

import { authMiddleware } from "./middleware/auth.middleware";

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

app.use("/auth", authRoutes);
app.use("/recovery", recoveryRoutes);
app.use(authMiddleware);
app.use("/email", emailRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`)
);
