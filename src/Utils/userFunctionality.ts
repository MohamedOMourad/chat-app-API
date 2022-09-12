import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../Entity/User";

export interface reqAuth extends Request {
    user?: User
}

export const userMiddlelware = async (req: reqAuth, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        if (!token) return res.status(401).send("untharize request");
        const { email } = jwt.verify(token as string, process.env.jwt_secret_key!) as { email: string };
        if (!email) return res.status(401).send("token is expired or unavailable")
        const user = await User.findOne({ where: { email } })
        req.user = user!;
        next()
    } catch (error) {
        res.status(404).send(error)
    }
}

export const createUserValiation = (firstName: string, lastName: string, email: string, password: string, res: any) => {
    if (!firstName) return res.status(406).send("First Name is required!")
    else if (!lastName) return res.status(406).send("Last Name is required!")
    else if (!email) return res.status(406).send("Email is required!")
    else if (!password || password.length < 8) return res.status(406).send("Password is required and more than 8-cahrcters!")
    else return true;
}

export const loginValiation = (email: string, password: string, res: any) => {
    if (!email) return res.status(406).send("Email is required!")
    else if (!password) return res.status(406).send("Password is required")
    else return true;
}
