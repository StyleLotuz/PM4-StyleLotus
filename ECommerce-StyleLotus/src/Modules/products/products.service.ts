import { Body, Injectable, Param } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) { }

    getAllProducts() {
        return this.productsRepository.getAllProduct()
    }

    createNewProduct(product: IProduct) {
        return this.productsRepository.createNewProduct(product)
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }

    modifyProduct(id: string, updateData: Partial<IProduct>) {
        return this.productsRepository.modifyProduct(id, updateData)
    }

    deleteProduct(id: string){
        return this.productsRepository.deleteProduct(id)
    }
}   