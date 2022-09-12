import axios from "axios";
import express from "express";
import { User } from "../Entity/User";
import { createUserValiation, loginValiation, reqAuth, userMiddlelware } from "../Utils/userFunctionality";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).send("users not found!")
        res.status(200).send({ data: users });
    } catch (e) {
        res.status(500).send(e);
    }
});


userRouter.post('/signup', async (req, res) => {
    try {
        const data = await axios.get('https://randomuser.me/api/')
        const imgUrl = data.data.results["0"].picture.thumbnail;

        const { firstName, lastName, email, password } = req.body;

        if (createUserValiation(firstName, lastName, email, password, res)) {
            const hashedPassword = await bcrypt.hash(password, 7);

            const user = User.create({
                firstName, lastName, email, imgUrl, password: hashedPassword
            });
            await user.save();

            const token = jwt.sign({ email }, process.env.jwt_secret_key!, { expiresIn: "24h" })
            res.status(200).send({ token });
        }
        else {
            createUserValiation(firstName, lastName, email, password, res);
        }
    } catch (error) {
        console.log(error)
    }
})

userRouter.get('/login', async (req, res) => {
    try {
        const { email, password } = req.headers;

        if (loginValiation(email as string, password as string, res)) {
            const user = await User.findOne({ where: { email: email as string } })
            if (!user) return res.status(401).send("incorect email or password!");

            const match = await bcrypt.compare(password as string, user!.password);
            if (match) {
                const token = jwt.sign({ email }, process.env.jwt_secret_key!, { expiresIn: "24h" })
                res.status(200).send({ token });
            }
            else {
                res.status(401).send("Wrong email or password!");
            }
        }
        else {
            loginValiation(email as string, password as string, res)
        }
    } catch (error) {
        console.log(error)
    }
})

userRouter.get('/me', userMiddlelware, async (req: reqAuth, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).send(error)
    }
});
export default userRouter;