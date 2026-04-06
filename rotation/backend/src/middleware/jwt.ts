import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/apperror.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

type AuthTokenPayload = {
    id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError("Unauthorized (DOES NOT HAVE BEARER DELETE AT PROD)", 401);

    }
    else if (!authHeader.startsWith("Bearer ")){
        throw new AppError("Unauthorized (DOES NOT START WITH BEARER DELETE AT PROD)", 401);
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        throw new AppError("Unauthorized (NO TOKEN DELETE AT PROD)", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true},
            
        });
        if(!user){
            throw new AppError("Unauthorized (USER NOT FOUND DELETE AT PROD)", 401);
        }
        req.user = user;
        next();
    }
    catch (err) {
        throw new AppError('Unauthorized (WRONG TOKEN DELETE AT PROD) ', 401);
    }
}