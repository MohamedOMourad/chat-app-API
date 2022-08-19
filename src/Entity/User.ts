import { Column, Entity, JoinTable, ManyToMany, OneToMany, } from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";
import { Super } from "./Super";

@Entity()
export class User extends Super {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    imgUrl: string;

    @OneToMany(() => Message, (messages) => messages.user)
    messages: Message[];

    @ManyToMany(() => Chat, (chat) => chat.users)
    chats: Chat[]
}