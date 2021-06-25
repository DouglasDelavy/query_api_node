import { Server } from "@overnightjs/core";
import * as http from "http";
import cors from "cors";
import { Application, json } from "express";
import { QueryController } from "./controllers/QueryController";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }
  private server?: http.Server;

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server Running on Port: ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  private setupExpress(): void {
    this.app.use(json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setupControllers(): void {
    const queryController = new QueryController();
    this.addControllers([queryController]);
  }
}
