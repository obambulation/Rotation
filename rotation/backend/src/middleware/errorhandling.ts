import type {NextFunction, Request, Response} from "express";
import AppError from "../utils/apperror.js";
import { Prisma } from "@prisma/client";

const errorhandling = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        console.error({msg: "Unexpected error", err, path: req.path});
        return next(err);
    } 
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message
        })
        
        
    }
};

const prismaErrorHandling = (err: any) => {
    switch (err.code) {
        case "P2002":
            return new AppError("Resource already exists", 400);
        default:
            return new AppError("An unexpected error occurred", 500);
    }
}

function instanceAppError(err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError("db err", 500, false);
    }
}

export default {errorhandling, prismaErrorHandling, instanceAppError};
