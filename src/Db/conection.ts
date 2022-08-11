import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";


config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [],
});