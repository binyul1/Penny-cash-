import { type Request, type Response, type NextFunction } from "express";

export const ErrorHandler = (error: any,req: Request,res: Response,next: NextFunction) => {
  let code = error.code || 500;
  let detail = error.details || error.detail || null;
  let message = error.message || "Internal App Error";

  //manipulating Mongodb error
  if (error.name && error.name === "MongoServerError") {
    if (+error.code === 11000) {
      code = 400;
      detail = {};
      // {email: 1} =>["email"]
      Object.keys(error.keyPattern).map((key: string) => {
        detail[key] = `${key} should be unique`;
      });
      message = "validation Failed";
    }
  }

  res.status(code).json({
    code: code,
    error: detail,
    message: message,
    status: false,
  });
};
