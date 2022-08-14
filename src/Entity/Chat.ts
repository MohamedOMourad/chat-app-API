import { Column, Entity, JoinTable, ManyToMany, OneToMany, } from "typeorm";
import { Message } from "./Message";
import { Super } from "./Super";
import { User } from "./User";

@Entity()
export class Chat extends Super {

    @Column()
    name: string;
    @OneToMany(() => Message, (messages) => messages.chat)
    messages: Message[];

    @ManyToMany(() => User)
    @JoinTable({ name:"chat_users"})
    users: User[]
}