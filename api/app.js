import express from "express";
// import {b} from ".hello"
// import a from ".hello"
import garbagesRouter from "./routers/garbages.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDbs from "./dbsConnect.js";

connectDbs();
const app = express();
const port = 3000;
app.use(express.json());

app.use(logger);

app.use("/api/garbages", garbagesRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Starting the garbages app on port http://localhost:${port}`);
});
