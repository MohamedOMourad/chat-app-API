import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../Entity/User";
import { Chat } from "../Entity/Chat";
import { Message } from "../Entity/Message";


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
    entities: [User, Chat, Message],
    subscribers: [],
    migrations: [],
});