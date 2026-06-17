import express, { type Application } from "express";
import router from "./router/router.ts";

const app: Application = express();

app.use(router);

export default app;
