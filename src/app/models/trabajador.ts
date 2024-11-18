import { Departamento } from "./departamento";

export class Trabajador {
    nombre: string;
    edad: number;
    fechaAlta: string;
    fechaBaja: string | null;
    salario: number;
    rol: string;
    fechaJefe?: string | null;
    departamentoTO?: Departamento;

    //Estamos usando Partial porque el objeto tiene propiedades opcionales en función del rol
    constructor(data: Partial<Trabajador>) {
        this.nombre = data.nombre || '';
        this.edad = data.edad || 0;
        this.fechaAlta = data.fechaAlta || '';
        this.fechaBaja = data.fechaBaja || null;
        this.salario = data.salario || 0;

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
