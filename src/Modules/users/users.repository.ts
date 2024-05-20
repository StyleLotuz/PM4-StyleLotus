import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
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

    async getAllUsers() {
        return this.users
    }
}