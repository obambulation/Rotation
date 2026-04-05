import express from "express"
import { signup, login, getMe } from "../controllers/authController.js"
import { protect } from "../middleware/jwt.js";


export const authrouter = express.Router();

authrouter.post('/signup', signup);

authrouter.post('/login', login);

authrouter.get('/me', protect, getMe);

export default authrouter;