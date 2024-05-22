import { UsersRepository } from './../users/users.repository';
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthRepository{
    constructor(private readonly usersRepository: UsersRepository){}

    async login(req: Request) {
        const {email, password} = req.body
        const users = await this.usersRepository.getAllUsers()        
        const user = users.find(user => user.email === email)
        if(user && user.password === password){
            return user
        } 

        return {message: 'Email o password incorrectos'}
    }
}