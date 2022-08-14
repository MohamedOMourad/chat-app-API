import { Column, Entity, ManyToOne, OneToMany, } from "typeorm";
import { Chat } from "./Chat";
import { Super } from "./Super";
import { User } from "./User";

@Entity()
export class Message extends Super {

    @Column()
    body: string;
    @ManyToOne(() => User, (user) => user.messages)
    user: User
    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat
}