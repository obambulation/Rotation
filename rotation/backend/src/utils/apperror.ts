export default class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number, operational?: boolean){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        if (operational !== undefined) {
            this.isOperational = operational;
        }


        Error.captureStackTrace(this, this.constructor);

    }
}

