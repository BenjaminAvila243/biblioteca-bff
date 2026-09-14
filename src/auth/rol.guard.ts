import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from './roles.decorator.js';
import type { Usuario } from './jwt.guard.js';

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // 1 · ¿Que grupos exige esta ruta? Lo lee de la etiqueta que dejo @Roles(...)
    const gruposRequeridos = this.reflector.get<string[]>(ROLES, ctx.getHandler());

    // 2 · Si el metodo no tiene @Roles, no exige nada especifico: se deja pasar.
    if (!gruposRequeridos || gruposRequeridos.length === 0) {
      return true;
    }

    // 3 · Saca el usuario que el JwtGuard ya dejo en la peticion.
    const req = ctx.switchToHttp().getRequest<{ usuario: Usuario }>();
    const gruposDelUsuario = req.usuario.grupos;

    // 4 · ¿El usuario tiene al menos uno de los grupos que pide la ruta?
    const tieneAcceso = gruposRequeridos.some((g) => gruposDelUsuario.includes(g));

    if (!tieneAcceso) {
      throw new ForbiddenException(`requiere uno de estos grupos: ${gruposRequeridos.join(', ')}`);
    }

    return true;
  }
}