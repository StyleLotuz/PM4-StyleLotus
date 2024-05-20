import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable({

})
export class UserService{
    constructor(private usersRepository: UsersRepository){}

    getAllUser(){
        return this.usersRepository.getAllUsers()
    }
}