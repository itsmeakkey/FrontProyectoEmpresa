import { Trabajador } from "./trabajador";

export interface Tarea {
    nombreTarea: string;
    fechaCreacion: Date;
    fechaFin: Date | null; //Null porque puede no haber terminado la tarea.
    entregadoATiempo: boolean;
    fechaEstimada: Date;
    
    empleadoTO: Trabajador;
}