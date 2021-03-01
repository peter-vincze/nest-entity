import {Entity as toEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@toEntity()
export class Entity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "mediumint"})
    salary: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    email: string;

    @Column({type: "boolean"})
    docker: boolean;

    @Column({type: "boolean"})
    agile : boolean;

    @Column({type: "date"})
    start: Date;

    @Column({type: "boolean"})
    senior : boolean;

    @Column({type: "boolean"})
    fullstack : boolean;

    @Column({type: "longtext"})
    description : string;
}
