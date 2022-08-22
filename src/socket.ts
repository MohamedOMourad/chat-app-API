// import express, { json, urlencoded } from "express";
// import http from 'http';
// import { Server } from "socket.io";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import { config } from "dotenv";

// export const app = express();
// config();
// app.use(cors());
// app.use(morgan("dev"));
// app.use(helmet());
// app.use(json());
// app.use(urlencoded({ extended: false }));

// const server = http.createServer(app);

// server.listen(5001, async () => {
//     try {
//         console.log("socket is connected")
//     } catch (error) {
//         throw new Error(`${(error as Error).message}`)
//     }
// })

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//     }
// });

// io.on("connection", (socket) => {
//     socket.on('sendMessage', (val) => {
//         console.log(val)
//         io.emit('reciveMessage', val);
//     });
// });


// app.listen(process.env.PORT, async () => {
//     console.log(`running on port ${process.env.PORT}`)
// })