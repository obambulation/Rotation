import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/apperror.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

type AuthTokenPayload = {
    id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return next(new AppError("Unauthorized (DOES NOT HAVE BEARER DELETE AT PROD)", 401));

        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return next(new AppError("Unauthorized (NO TOKEN DELETE AT PROD)", 401));
        }
        if(!process.env.JWT_SECRET){
            return next(new AppError("JWT_SECRET is not defined in environment variables", 500));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthTokenPayload;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true},
            
        });
        if(!user){
            return next(new AppError("Unauthorized (USER NOT FOUND DELETE AT PROD)", 401));
        }
        req.user = user;
        return next();
    }
    catch (err) {
        return next(new AppError('Unauthorized (WRONG TOKEN DELETE AT PROD) ', 401));
    }
}