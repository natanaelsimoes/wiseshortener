import express, { Express } from "express";
import URLMiddleware from "./Middleware/URLMiddleware";

const Routes : Express = express();

Routes.use("/", URLMiddleware);

export default Routes;
