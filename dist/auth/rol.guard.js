var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from './roles.decorator.js';
let RolGuard = class RolGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(ctx) {
        const gruposRequeridos = this.reflector.get(ROLES, ctx.getHandler());
        if (!gruposRequeridos || gruposRequeridos.length === 0) {
            return true;
        }
        const req = ctx.switchToHttp().getRequest();
        const gruposDelUsuario = req.usuario.grupos;
        const tieneAcceso = gruposRequeridos.some((g) => gruposDelUsuario.includes(g));
        if (!tieneAcceso) {
            throw new ForbiddenException(`requiere uno de estos grupos: ${gruposRequeridos.join(', ')}`);
        }
        return true;
    }
};
RolGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], RolGuard);
export { RolGuard };
//# sourceMappingURL=rol.guard.js.map