import { Request, Response, NextFunction } from "express";
import AppError from "../utils/apperror.ts";
import jwt from "jsonwebtoken";

type JwtPayload = {
    iat: number;
    exp: number;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new AppError("Unauthorized", 401);

    }
    const token = authHeader.split(" ")[1];
    if(!token){
        throw new AppError("Unauthorized", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new AppError('Unauthroized', 401);
    }
}