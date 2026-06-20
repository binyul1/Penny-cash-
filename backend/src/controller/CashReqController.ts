import type { Request, Response, NextFunction } from "express";

class CashReqController {
  createCash = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const file = req.file;

      if (file){
        return
      }



      res.json({
        file: file,
        data: data,
        //files: files
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };
}

export default CashReqController;
