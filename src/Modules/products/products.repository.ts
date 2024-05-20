import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: "Laptop",
            description: "High performance laptop",
            price: 999.99,
            stock: true,
            imgUrl: "https://example.com/images/laptop.jpg"
        },
        {
            id: 2,
            name: "Smartphone",
            description: "Latest model smartphone",
            price: 799.99,
            stock: true,
            imgUrl: "https://example.com/images/smartphone.jpg"
        },
        {
            id: 3,
            name: "Headphones",
            description: "Noise-cancelling headphones",
            price: 199.99,
            stock: false,
            imgUrl: "https://example.com/images/headphones.jpg"
        },
        {
            id: 4,
            name: "Smartwatch",
            description: "Waterproof smartwatch with GPS",
            price: 299.99,
            stock: true,
            imgUrl: "https://example.com/images/smartwatch.jpg"
        },
        {
            id: 5,
            name: "Camera",
            description: "Digital camera with 4K video recording",
            price: 499.99,
            stock: false,
            imgUrl: "https://example.com/images/camera.jpg"
        }
    ];

    async getAllProduct (){
        return this.products
    }
}