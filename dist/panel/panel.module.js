var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PanelController } from './panel.controller.js';
import { PanelService } from './panel.service.js';
import { JwtGuard } from '../auth/jwt.guard.js';
import { RolGuard } from '../auth/rol.guard.js';
let PanelModule = class PanelModule {
};
PanelModule = __decorate([
    Module({
        controllers: [PanelController],
        providers: [PanelService, JwtGuard, RolGuard],
    })
], PanelModule);
export { PanelModule };
//# sourceMappingURL=panel.module.js.map