import mysql, { Connection } from "mysql2/promise";
import { createClient, RedisClient } from "redis";

export const connectMySql = () =>
  mysql.createPool({
    host: "localhost",
    port: 3300,
    user: "root",
    password: "new1520",
    database: "test",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

export const connectRedis = (): RedisClient =>
  createClient({ host: "localhost" });
