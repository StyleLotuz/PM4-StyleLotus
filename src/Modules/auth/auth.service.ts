import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{
    authUsers(): string{
        return 'Auth Service'
    }
}