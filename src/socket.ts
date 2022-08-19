// import { app } from './index';
// import http from 'http';
// import { Server } from "socket.io";

// const server = http.createServer(app);

// export const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"]
//     }
// });

// server.listen(5001, async () => {
//     try {
//         console.log("socket is connected")
//     } catch (error) {
//         throw new Error(`${(error as Error).message}`)
//     }
// });


// io.on("connection", (socket) => {
//     socket.emit('chatMessage', { body: "heloofrom back" });
// });

// app.listen(process.env.PORT, async () => {
//     console.log(`running on port ${process.env.PORT}`)
//     try {
//         await AppDataSource.initialize();
//         console.log(`connected to the database`)
//     } catch (error) {
//         throw new Error(`${(error as Error).message}`)
//     }
// })