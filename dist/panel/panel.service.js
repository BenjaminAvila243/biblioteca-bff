var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ServiceUnavailableException, BadRequestException, ConflictException, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
let PanelService = class PanelService {
    librosUrl;
    prestamosUrl;
    constructor(config) {
        this.librosUrl = config.getOrThrow('LIBROS_URL');
        this.prestamosUrl = config.getOrThrow('PRESTAMOS_URL');
    }
    async pedir(url, nombre) {
        let respuesta;
        try {
            respuesta = await fetch(url);
        }
        catch {
            throw new ServiceUnavailableException(`el microservicio de ${nombre} no responde`);
        }
        if (!respuesta.ok) {
            throw new ServiceUnavailableException(`el microservicio de ${nombre} devolvio ${respuesta.status}`);
        }
        return (await respuesta.json());
    }
    async traerTodo() {
        return Promise.all([
            this.pedir(this.librosUrl, 'libros'),
            this.pedir(this.prestamosUrl, 'prestamos'),
        ]);
    }
    unir(prestamos, libros) {
        const porId = new Map(libros.map((l) => [l.id, l]));
        return prestamos.map(({ libroId, ...resto }) => ({
            ...resto,
            libro: porId.get(libroId) ?? { id: libroId, titulo: 'libro no encontrado' },
        }));
    }
    async mios(sub) {
        const [libros, prestamos] = await this.traerTodo();
        const mios = prestamos.filter((p) => p.usuarioSub === sub);
        return { total: mios.length, prestamos: this.unir(mios, libros) };
    }
    async todos() {
        const [libros, prestamos] = await this.traerTodo();
        return { total: prestamos.length, prestamos: this.unir(prestamos, libros) };
    }
    async miosEnSerie(sub) {
        const libros = await this.pedir(this.librosUrl, 'libros');
        const prestamos = await this.pedir(this.prestamosUrl, 'prestamos');
        const mios = prestamos.filter((p) => p.usuarioSub === sub);
        return { total: mios.length, prestamos: this.unir(mios, libros) };
    }
    async enviar(metodo, url, token, cuerpo) {
        let respuesta;
        try {
            respuesta = await fetch(url, {
                method: metodo,
                headers: {
                    ...(cuerpo ? { 'Content-Type': 'application/json' } : {}),
                    Authorization: token,
                },
                body: cuerpo ? JSON.stringify(cuerpo) : undefined,
            });
        }
        catch {
            throw new ServiceUnavailableException('el microservicio de prestamos no responde');
        }
        if (!respuesta.ok) {
            throw new ServiceUnavailableException(`el microservicio de prestamos devolvio ${respuesta.status}`);
        }
        return (await respuesta.json());
    }
    async prestar(sub, token, libroId) {
        if (typeof libroId !== 'number' || !Number.isInteger(libroId) || libroId < 1) {
            throw new BadRequestException('libroId tiene que ser un numero entero positivo');
        }
        const [libros, prestamos] = await this.traerTodo();
        const libro = libros.find((l) => l.id === libroId);
        if (!libro)
            throw new NotFoundException(`no existe el libro ${libroId}`);
        const enPrestamo = prestamos.filter((p) => p.libroId === libroId && !p.devuelto).length;
        if (enPrestamo >= libro.ejemplares) {
            throw new ConflictException(`no quedan ejemplares de "${libro.titulo}"`);
        }
        const hoy = new Date();
        const dia = (n) => new Date(hoy.getTime() + n * 86400000).toISOString().slice(0, 10);
        return this.enviar('POST', this.prestamosUrl, token, {
            libroId,
            usuarioSub: sub,
            desde: dia(0),
            hasta: dia(14),
            devuelto: false,
        });
    }
    async devolver(sub, token, id) {
        const [, prestamos] = await this.traerTodo();
        const prestamo = prestamos.find((p) => p.id === id);
        if (!prestamo || prestamo.usuarioSub !== sub) {
            throw new NotFoundException(`no existe el prestamo ${id}`);
        }
        if (prestamo.devuelto)
            throw new ConflictException(`el prestamo ${id} ya estaba devuelto`);
        return this.enviar('DELETE', `${this.prestamosUrl}/${id}`, token);
    }
};
PanelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], PanelService);
export { PanelService };
//# sourceMappingURL=panel.service.js.map