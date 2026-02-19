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

app.get("/", (req, res) => {
  res.json({ ip: req.ip, status: "fuck you mean"
   });
});

app.use(express.json());

console.log("APP.TS LOADED"); 

export default app;