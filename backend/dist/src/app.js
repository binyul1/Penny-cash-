import express from "express";
import router from "./router/router.js";
import { ErrorHandler } from "./middleware/ErrorHandling.js";
const app = express();
// security
// CORS
//middlewares
//parsers
app.use(express.json({
    limit: "3mb",
})); // json parsing
app.use(express.urlencoded({
    limit: "3mb",
}));
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