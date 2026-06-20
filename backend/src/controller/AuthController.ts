import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

class AuthController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body;
      res.json({
        data: credentials,
        message: "Login success",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserDetailById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // this function or route is only accessed by loggedin User =>
    try {
      const params = req.params;
      const query = req.query;

      const data = {
        id: params.userId,
        query: query,
      };
      res.json({
        data: data,
        message: "User Detail",
        meta: null,
      });
    } catch (exceptation) {
      next(exceptation);
    }
  };

  getLoggedInUserDetail = async(req: Request, res: Response, next: NextFunction) => {
    res.json({
      data:{
        user:{
          id: 1,
        },
      } ,
      message: "User Detail",
      meta: null
  })
}
}
export default AuthController;
