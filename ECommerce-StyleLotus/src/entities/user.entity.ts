import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Order } from "./orders.entity";

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({length: 50, nullable: false})
    name: string

    @Column({length: 50, unique: true, nullable: false})
    email: string

    @Column({length: 20, nullable: false})
    password: string

    @Column()
    phone: number

    @Column({length: 50})
    country: string

    @Column()
    address: string

    @Column({length: 50})
    city: string

    @OneToMany(()=> Order, order => order.user_id)
    orders_id: Order[]
}