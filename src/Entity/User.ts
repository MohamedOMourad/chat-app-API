import { Column, Entity, OneToMany, } from "typeorm";
import { Super } from "./Super";

@Entity()
export class User extends Super {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    imgUrl: string;
}