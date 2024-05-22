import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UserService {
    constructor(private usersRepository: UsersRepository) { }

    async getAllUser(page: number, limit: number) {
        const users = await this.usersRepository.getAllUsers(page, limit)
        return users.map(({ password, ...user }) => user)
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.getUserById(id)
        if (user) {
            const { password, ...rest } = user
            return rest
        }
        return null
    }

    createNewUser(userData: IUser) {
        return this.usersRepository.createNewUser(userData)
    }

    modifyUser(id: string, userData: Partial<IUser>) {
        return this.usersRepository.modifyUser(id, userData)
    }

    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id)
    }
}