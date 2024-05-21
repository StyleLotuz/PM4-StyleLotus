import { Controller, Delete, Get, HttpCode, Param, Post, Put, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductsService){}

    @HttpCode(200)
    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts()
    }

    @HttpCode(201)
    @Post()
    createNewProduct(@Body() product: IProduct){
        return this.productsService.createNewProduct(product)
    }    

    @HttpCode(201)
    @Get(":id")
    getProductById(@Param('id') id:string){
    return this.productsService.getProductById(id)
    }

    @HttpCode(200)
    @Put(':id')
    modifyProduct(@Param('id') id: string,@Body() updateData: Partial<IProduct>){
        return this.productsService.modifyProduct(id, updateData)
    }

    @HttpCode(200)
    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        return this.productsService.deleteProduct(id)
    }
}