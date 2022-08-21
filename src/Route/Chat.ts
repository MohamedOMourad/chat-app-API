import express from "express";
import { Chat } from "../Entity/Chat";
import { User } from "../Entity/User";
import { reqAuth, userMiddlelware } from "../Utils/userFunctionality";
import { In } from "typeorm";
const chatRouter = express.Router();

export interface ChatType extends Chat {
    imgUrl: string
}

const addChatsImg = (user: User, chats: Chat[]) => {
    return chats.map(chat => {
        return chat.users.length === 2 ? chat.users[0].id === user.id ?
            { ...chat, imgUrl: chat.users[1].imgUrl, name: chat.users[1].firstName } :
            { ...chat, imgUrl: chat.users[0].imgUrl, name: chat.users[0].firstName } :
            { ...chat, imgUrl: chat.users[0].imgUrl }
    })
};

chatRouter.get("/", userMiddlelware, async (req: reqAuth, res) => {
    try {

        const user = req.user!;

        let { chats } = (await User.findOne({
            where: { id: user.id },
            relations: { chats: { users: true } },
        }))!;

        const returnChats = addChatsImg(user, chats)
        res.status(200).json({ data: returnChats });
    } catch (error) {
        console.log(error)
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