import type { Request, Response, NextFunction } from "express";

class CashReqController {
  createCash = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      res.json({
        data: data,
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };
}

export default CashReqController;
