import express from "express";
import { protect } from "../middleware/jwt.js";
import { addItem } from "../controllers/itemController.js";

export const itemRouter = express.Router();

itemRouter.post("/add", protect, addItem);

export default itemRouter;