import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users: IUser[] = [
        {
            id: 1,
            email: "john.doe@example.com",
            name: "John Doe",
            password: "password123",
            address: "123 Main St, Apt 4B",
            phone: "+1-555-555-1234",
            country: "USA",
            city: "New York"
        },
        {
            id: 2,
            email: "jane.smith@example.com",
            name: "Jane Smith",
            password: "securepassword",
            address: "456 Oak St",
            phone: "+44-20-7946-0958",
            country: "UK",
            city: "London"
        },
        {
            id: 3,
            email: "pierre.dupont@example.com",
            name: "Pierre Dupont",
            password: "motdepasse",
            address: "789 Rue de Rivoli",
            phone: "+33-1-2345-6789",
            country: "France",
            city: "Paris"
        },
        {
            id: 4,
            email: "maria.garcia@example.com",
            name: "Maria Garcia",
            password: "contraseña",
            address: "101 La Rambla",
            phone: "+34-93-123-4567",
            country: undefined,
            city: undefined
        },
        {
            id: 5,
            email: "akio.tanaka@example.com",
            name: "Akio Tanaka",
            password: "パスワード",
            address: "202 Shibuya Crossing",
            phone: "+81-3-1234-5678",
            country: "Japan",
            city: "Tokyo" 
        }
    ]

    async getAllUsers(page: number = 1, limit: number = 5): Promise<IUser[]> {
    }

    async getUserById(id: string): Promise<IUser> {
        const user = this.users.find(user => user.id === Number(id))
        return user
    }

    async createNewUser(userData: IUser): Promise<IUser> {
        let id = this.users.length + 1
        this.users = [...this.users, { id, ...userData }]
        return { id, ...userData }
    }

    async modifyUser(id: string, dataToUpdate: Partial<IUser>) {
        const userIndex = this.users.findIndex(user => user.id === Number(id))
        const existingUser = this.users[userIndex]
        const updatedUser = { ...existingUser, ...dataToUpdate, id: existingUser.id }
        this.users[userIndex] = updatedUser

        return updatedUser
    }

    async deleteUser(id: string): Promise<IUser> {
        const userIndex = this.users.findIndex(user => user.id === Number(id))
        const deleteUser = this.users[userIndex]
        this.users.splice(userIndex, 1)

        return deleteUser
    }
}