import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constant';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.cookies?.token;
      if (!token) {
        throw new UnauthorizedException(
          'You are not Authorized !!! Or Please LogIn with your Credentials',
        );
      }
      try {
        const student = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request['student'] = student;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  }