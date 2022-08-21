import "reflect-metadata";
import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { AppDataSource } from './Db/conection';
import userRouter from "./Route/User";
import chatRouter from "./Route/Chat";
import messageRouter from "./Route/Message";
import http from 'http';
import { Server } from "socket.io";

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/user', userRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)

const server = http.createServer(app);

server.listen(5001, async () => {
    try {
        console.log("socket is connected")
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
})

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    socket.emit('chatMessage', { body: "heloofrom back" });
});



app.get("/", (req, res) => {
    res.status(200).send('How You Doin');
});

app.get("/*", (req, res) => {
    res.status(404).send({ error: "End Point NOt Found!" });
});

app.listen(process.env.PORT, async () => {
    console.log(`running on port ${process.env.PORT}`)
    try {
        await AppDataSource.initialize();
        console.log(`connected to the database`)
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
})

