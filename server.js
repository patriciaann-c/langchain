import express from "express";
import aiRouter from "./routers/aiRouter.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/ai', aiRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server in ascolto sulla porta ${PORT}`);
    }


})