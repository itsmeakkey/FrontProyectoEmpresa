import { Trabajador } from "./trabajador";

export interface Departamento {
    nombre: string;
    jefeTO: Trabajador; //Y este a su vez tendrá roles según lo que se necesite
    

}
