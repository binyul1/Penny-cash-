import {type Request, type Response, type NextFunction } from "express";

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  // res.end("Hello World")
  res.json({
    data: "Health OK",
    message: "Success",
    meta: null,
  });
};