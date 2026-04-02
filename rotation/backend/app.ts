import helmet from "helmet";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { authrouter } from "./src/routes/authroutes";


export const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({
    origin: process.env["CORS_ORIGIN"] || "http://localhost:3000",
    credentials: true,
}))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount auth routes
app.use('/auth', authrouter);

console.log("APP.TS LOADED"); 

export default app;