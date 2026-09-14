import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export type Usuario = {
    sub: string;
    scope: string;
    grupos: string[];
};
export declare class JwtGuard implements CanActivate {
    private readonly issuer;
    private readonly clientId;
    private readonly jwks;
    constructor(config: ConfigService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
