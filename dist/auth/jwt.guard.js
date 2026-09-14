var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';
let JwtGuard = class JwtGuard {
    issuer;
    clientId;
    jwks;
    constructor(config) {
        this.issuer = config.getOrThrow('COGNITO_ISSUER');
        this.clientId = config.getOrThrow('COGNITO_CLIENT_ID');
        this.jwks = createRemoteJWKSet(new URL(`${this.issuer}/.well-known/jwks.json`));
    }
    async canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const cabecera = req.headers.authorization;
        if (!cabecera?.startsWith('Bearer ')) {
            throw new UnauthorizedException('sin token');
        }
        let payload;
        try {
            ({ payload } = await jwtVerify(cabecera.slice(7), this.jwks, { issuer: this.issuer }));
        }
        catch (e) {
            throw new UnauthorizedException(e.message);
        }
        if (payload.token_use !== 'access') {
            throw new UnauthorizedException('no es un access token');
        }
        if (payload.client_id !== this.clientId) {
            throw new UnauthorizedException('app client desconocido');
        }
        const grupos = payload['cognito:groups'] ?? [];
        req.usuario = {
            sub: payload.sub,
            scope: payload.scope ?? '',
            grupos: grupos.length > 0 ? grupos : ['lectores'],
        };
        return true;
    }
};
JwtGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], JwtGuard);
export { JwtGuard };
//# sourceMappingURL=jwt.guard.js.map