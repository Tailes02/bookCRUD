import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKey = '2k2'; 

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredApiKey = this.reflector.get<boolean>('api-key-oath', context.getHandler());

    if (!requiredApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.validApiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
