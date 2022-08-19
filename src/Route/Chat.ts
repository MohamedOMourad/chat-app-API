import express from "express";
import { Chat } from "../Entity/Chat";
import { User } from "../Entity/User";
import { reqAuth, userMiddlelware } from "../Utils/userFunctionality";
import { In } from "typeorm";
import axios from "axios";

export interface ChatType extends Chat {
    imgUrl: string
}

const addChatsImg = (user: User, chats: Chat[], imgUrl: string) => {
    return chats.map(chat => {
        return chat.users.length === 2 ? chat.users[0].id === user.id ?
            { ...chat, imgUrl: chat.users[1].imgUrl, name: chat.users[1].firstName } :
            { ...chat, imgUrl: chat.users[0].imgUrl, name: chat.users[0].firstName } :
            { ...chat, imgUrl }
    })
};
const chatRouter = express.Router();

chatRouter.get("/", userMiddlelware, async (req: reqAuth, res) => {
    try {
        const data = await axios.get('https://randomuser.me/api/')
        const imgUrl = data.data.results["0"].picture.thumbnail;

        const user = req.user!;

        let { chats } = (await User.findOne({
            where: { id: user.id },
            relations: { chats: { users: true } },
        }))!;

        const returnChats = addChatsImg(user, chats, imgUrl)
        res.status(200).json({ data: returnChats });
    } catch (error) {
        res.status(500).json({ error });
    }
});


chatRouter.post('/', userMiddlelware, async (req: reqAuth, res) => {
    try {
        const user = req.user!;
        const { name, usersList } = req.body;
        console.log(name, usersList);
        if (!name) return res.status(406).send("Name is required!")
        if (usersList.length > 0) {
            let users = await User.find({ where: { id: In(usersList || []) } });
            users.push(user);
            const chat = Chat.create({
                name, users
            });
            await chat.save();
            
            res.status(200).send({ data: chat })
        }
        else {
            res.status(406).send("users are required")
        }
    } catch (error) {
        console.log(error)
    }
})

export default chatRouter;
// chatRouter.post('/newchat', userMiddlelware, async (req: reqAuth, res) => {
//     try {
//         const { userId } = req.body;
//         const user = req.user!;
//         const { chats } = (await User.findOne({
//             where: { id: user.id },
//             relations: { chats: { users: true } },
//         }))!;
//         const userChat = chats.find(chat => {
//             return chat.users.find(user => user.id === userId)
//         })
//         res.status(200).send({ data: userChat })
//     } catch (error) {
//         console.log(error)
//     }
// })
// if (!name) return res.status(406).send("Name is required!")
// if (!userId) return res.status(406).send("please select user to chat with!")
// const selectedUser = await User.findOne({ where: { id: userId } });
// // if (usersList.length > 0) {
//     let users = await User.find({ where: { id: In(usersList || []) } });
//     users.push(user);
//     const chat = Chat.create({
//         name, users
//     });
//     await chat.save();
//     res.status(200).send({ data: chat })
// }
// else {
//     res.status(406).send("users are required")
// }