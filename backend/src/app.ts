import express, { type Application } from "express";
import router from "./router/router.ts";
import { ErrorHandler } from "./middleware/ErrorHandling.ts";
import { type Request, type Response, type NextFunction } from "express";
import "./config/mongodb.ts";
import cors from "cors";
import path from "path";

const app: Application = express();

// security
// CORS
app.use(
  cors(),
  //origin: "localhost:5137", // allow only this origin
);
//middlewares
//parsers
app.use(
  express.json({
    limit: "3mb",
  }),
); // json parsing

app.use(
  express.urlencoded({
    limit: "3mb",
  }),
);

app.use("/uploads", express.static(path.resolve("public/uploads")));

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    code: 404,
    message: "Route Not Found",
  });
});

//error handling middleware
app.use(ErrorHandler);

export default app;
