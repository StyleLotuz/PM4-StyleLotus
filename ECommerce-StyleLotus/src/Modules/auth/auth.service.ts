import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService{
    constructor(private readonly authRepository: AuthRepository){}
    login(req: Request) {
        return this.authRepository.login(req)
    }

    authUsers(): string{
        return 'Auth Service'
    }
}