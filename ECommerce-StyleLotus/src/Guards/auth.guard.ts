import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

const validateRequest = (req: Request) => {
    const authorization = req.headers['authorization']

    if (!authorization) return false

    const authHeaderParts = authorization.split(' ')
    if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Basic') return false

    const credentials = authHeaderParts[1].split(':')
    const [email, password] = credentials

    if(!email||!password) return false

    return true
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateRequest(request)
    }
}