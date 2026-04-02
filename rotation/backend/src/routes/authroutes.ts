import express from "express"
import { signup, login } from "../controllers/authController"

export const authrouter = express.Router();

authrouter.post('/signup', signup);

authrouter.post('/login', login);
export default authrouter;