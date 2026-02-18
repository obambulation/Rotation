import {NextFunction, Request, Response} from "express";
import port from "../config/config";

const errorhandling = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(err);
    } else {
        console.error(err);
        res.status(500).json(
            {
                error: "An unexpected error occurred. Please try again later."
            }
        );
    }
};

export default errorhandling;
