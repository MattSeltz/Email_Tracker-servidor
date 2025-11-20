"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const configs_1 = require("./configs/configs");
const email_routes_1 = __importDefault(require("./routes/email.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const recovery_routes_1 = __importDefault(require("./routes/recovery.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: configs_1.CLIENT,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (_, res) => {
    res.send(`<h1>Email Tracker</h1>`);
});
app.use("/auth", auth_routes_1.default);
app.use("/recovery", recovery_routes_1.default);
app.use(auth_middleware_1.authMiddleware);
app.use("/email", email_routes_1.default);
app.listen(configs_1.SERVER_PORT, () => console.log(`Servidor corriendo en el puerto ${configs_1.SERVER_PORT}`));
