import { Departamento } from "./departamento";

export class Trabajador {
    nombre: string;
    edad: number;
    fechaAlta: Date;
    fechaBaja: Date | null; //Null porque puede ser que mi trabajador no esté de baja.
    salario: number;
    rol: string;
    //Campo adicional de Jefe
    fechaJefe?: Date | null; //Es un optional, porque puede no ser un jefe.
    //Campo adicional de empleado
    departamento?: Departamento;

    constructor(nombre: string, edad: number, fechaAlta: Date, fechaBaja: Date | null, salario: number, rol: string, fechaJefe?: Date | null, departamento?: Departamento) {
        this.nombre = nombre;
        this.edad = edad;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.salario = salario;
        this.rol = rol;
        if (rol == 'Jefe') { //Si el rol es Jefe, se usa fechaJefe.
            this.fechaJefe = fechaJefe;
        } else if (rol === 'Empleado') {//Si el rol es Empleado, se usa departamento.
            this.departamento = departamento;
        }
    }
}
