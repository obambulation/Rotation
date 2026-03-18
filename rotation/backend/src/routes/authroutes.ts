import express from "express"
import { signup } from "../controllers/authController"

export const router = express.Router();

router.post('/signup', signup);

export default router;