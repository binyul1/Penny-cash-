import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // res.end("Hello World")
  res.json({
    data: "Health OK",
    message: "Success",
    meta: null,
  });
});

router.post(
  "/auth/login",
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      data: {
        accessToken: "",
        refreshToken: "",
      },
      message: "Message",
      meta: null,
    });
  },
);

router.get(
  "/user/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const data = {
      userId: params.userId,
    };
    res.json({
      data: data,
      message: "User fetched",
      meta: null,
    });
  },
);

export default router;
