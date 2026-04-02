import { signup as signupService, login as loginService} from "../services/authservices";
import AppError from "../utils/apperror";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export async function signup(req: any, res: any) {
    const { email, username, password, phoneNumber } = req.body;

    if(!email || !username || !password){
        throw new AppError("Email, username and password are required", 400);
    }

    const newUser = await signupService({email, username, password, phoneNumber});
    res.status(201).json({message: "User Created"})

    

}

export async function login(req: any, res: any) {
    const { email, username, password, phoneNumber } = req.body;
    if(!email || !password){
        throw new AppError("Email and password are required", 400); 
    }
    const logged = await loginService({email, password, username, phoneNumber});
    res.status(200).json({message: logged.User.phoneNumber, token: logged.token});
    console.log(logged);

}
