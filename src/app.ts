import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from "./config";
import { IRoute } from "./interfaces/routes.interfaces";
import {logger,stream} from "./utils/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { connect, ConnectOptions } from "mongoose";
import { dbConnection } from "./databases";
import morganMiddleware from "./middlewares/morgan.middleware";
import { Paystack } from "./utils/paystack";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectToDatabase();
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(` App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
   connectToDatabase() {
   connect(dbConnection.url, dbConnection.options as ConnectOptions)
     .then(() => {
       logger.info("Database connected");
     })
     .catch((error) => {
       logger.error("Db error: ", error)
     });
  }
  initializeMiddlewares() {
        this.app.use(morganMiddleware);
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
  }
  initializeRoutes(routes: IRoute[]) {
     routes.forEach((route) => {
       this.app.use("/api/v1", route.router);
     });
     this.app.use('/api/v1/paystackhook',Paystack.webhook);
  }
  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App