import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import * as database from "../database";

enum QueryType {
  Execute = 0,
  Query = 1,
}

enum QueryRedisType {
  Query = 0,
  Save = 1,
  Delete = 2,
}

interface QueryData {
  query: string;
  params: object;
  type: QueryType;
}

interface QueryRedisData {
  key: string;
  value: string;
  type: QueryRedisType;
}

@Controller("query")
export class QueryController {
  @Post("")
  private async createQuery(req: Request, res: Response): Promise<void> {
    const data: QueryData = req.body;
    const connection = database.connectMySql();
    var result: any = "[]";

    switch (data.type) {
      case QueryType.Execute:
        const [executeRows] = await connection.query(data.query, data.params);

        result = executeRows;
        break;
      case QueryType.Query:
        const [queryRows] = await connection.query(data.query, data.params);

        result = queryRows;
        break;
    }

    res.status(200).send(result);
  }

  @Post("redis")
  private async createQueryRedis(req: Request, res: Response): Promise<void> {
    const data: QueryRedisData = req.body;
    const connection = database.connectRedis();
    var result: any = "[]";

    switch (data.type) {
      case QueryRedisType.Query:
        const queryPromise = new Promise((resolve, reject) => {
          connection.get(data.key, (error, result) => {
            if (error) reject(error);

            resolve(result);
          });
        });

        result = await queryPromise;
        break;
      case QueryRedisType.Save:
        const savePromise = new Promise((resolve, reject) => {
          connection.set(data.key, data.value, (error, result) => {
            if (error) reject(error);

            resolve(result);
          });
        });

        result = await savePromise;
        break;
      case QueryRedisType.Delete:
        const deletePromise = new Promise((resolve, reject) => {
          connection.del(data.key, data.value, (error, result) => {
            if (error) reject(error);

            resolve(result);
          });
        });

        result = JSON.stringify(await deletePromise);
        break;
    }

    res.status(200).send(result);
  }
}
