import { Controller, Delete, Get, HttpCode, Param, Post, Put, Body, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/Guards/auth.guard";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService: ProductsService){}

    @HttpCode(200)
    @Get()
    getAllProducts(@Query('page') page:string = '1', @Query('limit') limit: string = '5'){
        const pageNumber = parseInt(page, 10) || 1
        const limitNumber = parseInt(limit, 10) || 5
        return this.productsService.getAllProducts(pageNumber, limitNumber)
    }

    @HttpCode(201)
    @Post()
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    modifyProduct(@Param('id') id: string,@Body() updateData: Partial<IProduct>){
        return this.productsService.modifyProduct(id, updateData)
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id:string){
        return this.productsService.deleteProduct(id)
    }
}