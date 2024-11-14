export class Trabajador {

    nombre: string;
    edad: number;
    fechaAlta: Date;
    fechaBaja: Date | null; //Null porque puede ser que mi trabajador no esté de baja.
    salario: number;
    rol: string;
    fechaJefe?: Date; //Es un optional, porque puede no ser un jefe.

    constructor(nombre: string, edad: number, fechaAlta: Date, fechaBaja: Date | null, salario: number, rol : string, fechaJefe?:Date) {
        this.nombre = nombre;
        this.edad = edad;
        this.fechaAlta = fechaAlta;
        this.fechaBaja = fechaBaja;
        this.salario = salario;
        this.rol = rol;
        if (rol === 'Jefe' && fechaJefe) { //Si el rol es Jefe y existe el atributo, se usa fechaJefe.
        this.fechaJefe = fechaJefe;
    }
    }
}
