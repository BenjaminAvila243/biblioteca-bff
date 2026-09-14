import { ConfigService } from '@nestjs/config';
export type Libro = {
    id: number;
    titulo: string;
    autor: string;
    anio: number | null;
    paginas: number | null;
    categoria: string;
    isbn13: string | null;
    sinopsis: string;
    ejemplares: number;
};
export type Prestamo = {
    id: number;
    libroId: number;
    usuarioSub: string;
    desde: string;
    hasta: string;
    devuelto: boolean;
};
export declare class PanelService {
    private readonly librosUrl;
    private readonly prestamosUrl;
    constructor(config: ConfigService);
    private pedir;
    private traerTodo;
    private unir;
    mios(sub: string): Promise<{
        total: number;
        prestamos: {
            libro: Libro | {
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
    todos(): Promise<{
        total: number;
        prestamos: {
            libro: Libro | {
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
    miosEnSerie(sub: string): Promise<{
        total: number;
        prestamos: {
            libro: Libro | {
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
    private enviar;
    prestar(sub: string, libroId: unknown): Promise<Prestamo>;
    devolver(sub: string, id: number): Promise<Prestamo>;
}
