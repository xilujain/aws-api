"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./config/index");
const errorHandler_1 = require("./middlewares/errorHandler");
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const db_1 = require("./config/db");
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const port = index_1.dev.app.port || 8080;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`);
    (0, db_1.connectDB)();
});
app.get('/', (req, res) => {
    res.json({ message: 'health checkup' });
});
app.use('/products', productRoute_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, 'Not found'));
});
app.use(errorHandler_1.errorHandler);
