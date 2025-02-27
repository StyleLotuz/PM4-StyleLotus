import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) throw new UnauthorizedException('Bearer token not found');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      request.user = payload;

      payload.exp = new Date(payload.exp);
      payload.iat = new Date(payload.iat);
      payload.roles = [Role.ADMIN];
      request.user.exp = payload.exp;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
