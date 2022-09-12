import { Router } from "express";
import { Chat } from "../Entity/Chat";
import { Message } from "../Entity/Message";
import { reqAuth, userMiddlelware } from "../Utils/userFunctionality";
const messageRouter = Router();


messageRouter.get("/:id", userMiddlelware, async (req: reqAuth, res) => {
    try {
        const user = req.user!;
        const { id } = req.params;
        if (!id) return res.status(400).send("conversation id are required!")
        const messages = await Message.find({
            where: { chat: { id: +id } },
            relations: { user: true },
        });
        res.status(200).send({ data: messages })
    } catch (e) {
        res.status(500).json({ error: "Server error!" });
    }
});

messageRouter.post("/", userMiddlelware, async (req: reqAuth, res) => {
    try {
        const user = req.user!;
        const { id, body } = req.body;
        if (!id || !body) return res.status(406).send("conversation id and massage are required!")
        const chat = await Chat.findOne({ where: { id: +id }});
        if (!chat) {
            return res.status(404).json({ message: "Conversation is not found!" });
        }
        const message = Message.create({
            body,
            user,
            chat,
        });
        await message.save();
        res.status(201).send({ data: message });
    } catch (e) {
        res.status(500).json({ error: "Server error!" });
    }
});

export default messageRouter;
