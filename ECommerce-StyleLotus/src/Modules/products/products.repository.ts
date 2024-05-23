// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ProductsRepository {
//   private products: IProduct[] = [
//     {
//       id: 1,
//       name: 'Laptop',
//       description: 'High performance laptop',
//       price: 999.99,
//       stock: true,
//       imgUrl: 'https://example.com/images/laptop.jpg',
//     },
//     {
//       id: 2,
//       name: 'Smartphone',
//       description: 'Latest model smartphone',
//       price: 799.99,
//       stock: true,
//       imgUrl: 'https://example.com/images/smartphone.jpg',
//     },
//     {
//       id: 3,
//       name: 'Headphones',
//       description: 'Noise-cancelling headphones',
//       price: 199.99,
//       stock: false,
//       imgUrl: 'https://example.com/images/headphones.jpg',
//     },
//     {
//       id: 4,
//       name: 'Smartwatch',
//       description: 'Waterproof smartwatch with GPS',
//       price: 299.99,
//       stock: true,
//       imgUrl: 'https://example.com/images/smartwatch.jpg',
//     },
//     {
//       id: 5,
//       name: 'Camera',
//       description: 'Digital camera with 4K video recording',
//       price: 499.99,
//       stock: false,
//       imgUrl: 'https://example.com/images/camera.jpg',
//     },
//   ];

//   async getAllProduct(page: number, limit: number) {
//     const startIndex = (page - 1) * 5;
//     return this.products.slice(startIndex, startIndex + limit);
//   }

//   async createNewProduct(product: Omit<IProduct, 'id'>) {
//     const id = this.products.length + 1;
//     const newProduct = { id, ...product };
//     this.products = [...this.products, newProduct];
//     return newProduct;
//   }

//   async getProductById(id: string) {
//     return this.products.find((product) => product.id === Number(id));
//   }

//   async modifyProduct(id: string, updateData: Partial<IProduct>) {
//     const productIndex = this.products.findIndex(
//       (product) => product.id === Number(id),
//     );
//     if (productIndex === -1) {
//       throw new Error('There was an error');
//     }

//     const existingProduct = this.products[productIndex];
//     const updatedProduct = {
//       ...existingProduct,
//       ...updateData,
//       id: existingProduct.id,
//     };
//     this.products[productIndex] = updatedProduct;

//     return updatedProduct;
//   }

//   async deleteProduct(id: string): Promise<IProduct> {
//     const productIndex = this.products.findIndex(
//       (product) => product.id === Number(id),
//     );
//     const deletedProduct = this.products[productIndex];
//     this.products.splice(productIndex, 1);

//     return deletedProduct;
//   }
// }
