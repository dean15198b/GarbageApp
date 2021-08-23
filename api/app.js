import express from "express";
// import {b} from ".hello"
// import a from ".hello"
import garbagesRouter from "./routers/garbages.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDbs from "./dbsConnect.js";
import allowAccessControlOrigin from "./middlewares/accessControl.js";
connectDbs();
export const app = express();
const port = 4000;
app.use(express.json());

app.use(logger);

if (app.get("env") === "development") app.use(allowAccessControlOrigin);

app.use("/api/garbages", garbagesRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting the garbages app on port http://localhost:${port}`);
});
