import { Departamento } from "./departamento";

export class Trabajador {

    id: number;
    nombre: string;
    edad: number;
    fechaAlta: string | null;
    fechaBaja: string | null;
    salario: number;
    rol: string;
    fechaJefe?: string | null;
    departamentoTO?: Departamento;
    departamentoId?: string;

    //Estamos usando Partial porque el objeto tiene propiedades opcionales en función del rol
    constructor(data: Partial<Trabajador>) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
        this.edad = data.edad || 0;
        this.fechaAlta = data.fechaAlta ?? null; //Son null si no están presentes
        this.fechaBaja = data.fechaBaja ?? null;
        this.salario = data.salario || 0;
        this.departamentoId = data.departamentoId;

        //Con esto determinamos el rol en función de los campos que tenga
        if (data.fechaJefe) {
            this.rol = 'Jefe';
            this.fechaJefe = data.fechaJefe;
        } else if (data.departamentoTO) {
            this.rol = 'Empleado';
            this.departamentoTO = data.departamentoTO;
        } else {
            this.rol = 'Desconocido'; //Por si no fuera ninguno.
        }
    }
}
