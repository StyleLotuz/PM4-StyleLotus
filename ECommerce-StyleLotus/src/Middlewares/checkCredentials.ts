import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckCredentials implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body
        if(!email || !password){
            throw new HttpException('Email o password incorrectos', HttpStatus.BAD_REQUEST)
        }
        next()
    }
}