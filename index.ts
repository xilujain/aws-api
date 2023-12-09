import express, { Application } from "express";
import { dev } from "./src/config/index";
import { errorHandler } from "./src/middlewares/errorHandler";
import productRoute from "./src/routes/productRoute";
import { connectDB } from "./src/config/db";
import createHttpError from "http-errors";
import morgan from "morgan";

const app: Application = express();
const port = dev.app.port || 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`);
    connectDB();
});
app.get('/', (req, res) => {
    res.json({ message: 'health checkup' });
});

app.use('/products', productRoute);

app.use((req, res, next) => {
    next(createHttpError(404, 'Not found'));
});
app.use(errorHandler);