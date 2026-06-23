import express from "express";
import router from "./router/router.js";
import { ErrorHandler } from "./middleware/ErrorHandling.js";
import "./config/mongodb.js";
import cors from "cors";
import path from "path";
const app = express();
// security
// CORS
app.use(cors());
//middlewares
//parsers
app.use(express.json({
    limit: "3mb",
})); // json parsing
app.use(express.urlencoded({
    limit: "3mb",
}));
app.use("/uploads", express.static(path.resolve("public/uploads")));
app.use(router);
app.use((req, res, next) => {
    next({
        code: 404,
        message: "Route Not Found",
    });
});
//error handling middleware
app.use(ErrorHandler);
export default app;
//# sourceMappingURL=app.js.map