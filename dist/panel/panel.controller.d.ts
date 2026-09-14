import { type Usuario } from '../auth/jwt.guard.js';
import { PanelService } from './panel.service.js';
export declare class PanelController {
    private readonly panel;
    constructor(panel: PanelService);
    mios(req: {
        usuario: Usuario;
    }): Promise<{
        total: number;
        prestamos: {
            libro: import("./panel.service.js").Libro | {
                id: number;
                titulo: string;
            };
            id: number;
            usuarioSub: string;
            desde: string;
            hasta: string;
            devuelto: boolean;
        }[];
        usuario: {
            sub: string;
            grupos: string[];
        };
    }>;
    serie(req: {
        usuario: Usuario;
    }): Promise<{
        total: number;
        prestamos: {
            libro: import("./panel.service.js").Libro | {
                id: number;
                titulo: string;
            };
            id: number;
            usuarioSub: string;
            desde: string;
            hasta: string;
            devuelto: boolean;
        }[];
    }>;
    todos(req: {
        usuario: Usuario;
    }): Promise<{
        total: number;
        prestamos: {
            libro: import("./panel.service.js").Libro | {
                id: number;
                titulo: string;
            };
            id: number;
            usuarioSub: string;
            desde: string;
            hasta: string;
            devuelto: boolean;
        }[];
        usuario: {
            sub: string;
            grupos: string[];
        };
    }>;
    prestar(req: {
        usuario: Usuario;
    }, cuerpo: {
        libroId?: unknown;
    }): Promise<import("./panel.service.js").Prestamo>;
    devolver(req: {
        usuario: Usuario;
    }, id: number): Promise<import("./panel.service.js").Prestamo>;
}
