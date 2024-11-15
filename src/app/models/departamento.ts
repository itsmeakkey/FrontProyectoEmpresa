import { Trabajador } from "./trabajador";

export interface Departamento {

    nombre: string;
    jefe: Trabajador; //Y este a su vez tendrá roles según lo que se necesite
    

}
