import {NextFunction, Request, Response} from "express";
import AppError from "../utils/apperror";

const errorhandling = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
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

export default {errorhandling, prismaErrorHandling};
