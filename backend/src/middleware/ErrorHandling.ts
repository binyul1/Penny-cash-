import {type Request, type Response, type NextFunction} from "express";

export const ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let code = error.code || 500;
    let detail = error.details || error.detail || null;
    let message = error.message || "Internal App Error";

    
    res.status(code).json({
            code : code,
            error: detail,
            message: message,
            status: false
        })
}