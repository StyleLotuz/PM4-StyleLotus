import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { UsersRepository } from "../users/users.repository";
import { CheckCredentials } from "src/Middlewares/checkCredentials";

@Module({
    controllers: [AuthController], 
    providers:[AuthService, AuthRepository, UsersRepository]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckCredentials).forRoutes({path:'auth', method: RequestMethod.POST})
    }
}