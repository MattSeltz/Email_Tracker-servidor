import express from "express";
import cors from "cors";

import { SERVER_PORT } from "./config/config";

import emailRoutes from "./routes/email.routes";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send(`<h1>Email Tracker</h1>`);
});

app.use("/email", emailRoutes);

app.listen(SERVER_PORT, () =>
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`)
);
