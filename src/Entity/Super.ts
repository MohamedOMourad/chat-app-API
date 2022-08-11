import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Super extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    dateCreated: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    dateUpdated: Date;
}