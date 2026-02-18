import helmet from "helmet";
import cors from "cors";
import express from "express";

export const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({
    origin: process.env["CORS_ORIGIN"] || "http://localhost:3000",
    credentials: true,
}))

app.get("/health", (_, res) => {
  res.json({ status: "fuckkk" });
});

app.use(express.json());

console.log("APP.TS LOADED"); // Add this line

export default app;