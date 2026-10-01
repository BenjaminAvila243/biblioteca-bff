var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards, } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard.js';
import { RolGuard } from '../auth/rol.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { PanelService } from './panel.service.js';
let PanelController = class PanelController {
    panel;
    constructor(panel) {
        this.panel = panel;
    }
    async mios(req) {
        return {
            usuario: { sub: req.usuario.sub, grupos: req.usuario.grupos },
            ...(await this.panel.mios(req.usuario.sub)),
        };
    }
    async serie(req) {
        return this.panel.miosEnSerie(req.usuario.sub);
    }
    async todos(req) {
        return {
            usuario: { sub: req.usuario.sub, grupos: req.usuario.grupos },
            ...(await this.panel.todos()),
        };
    }
    async prestar(req, cuerpo) {
        return this.panel.prestar(req.usuario.sub, req.headers['authorization'] ?? '', cuerpo.libroId);
    }
    async devolver(req, id) {
        return this.panel.devolver(req.usuario.sub, req.headers['authorization'] ?? '', id);
    }
};
__decorate([
    Get(),
    Roles('lectores', 'bibliotecarios'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "mios", null);
__decorate([
    Get('serie'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "serie", null);
__decorate([
    Get('todos'),
    Roles('bibliotecarios'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "todos", null);
__decorate([
    Post('prestamos'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "prestar", null);
__decorate([
    Delete('prestamos/:id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PanelController.prototype, "devolver", null);
PanelController = __decorate([
    Controller('panel'),
    UseGuards(JwtGuard, RolGuard),
    __metadata("design:paramtypes", [PanelService])
], PanelController);
export { PanelController };
//# sourceMappingURL=panel.controller.js.map