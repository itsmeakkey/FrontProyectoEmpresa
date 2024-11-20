import { Trabajador } from "./trabajador";

export interface Departamento {
    id: number;
    nombre: string;
    jefeTO: Trabajador; //Y este a su vez tendrá roles según lo que se necesite
    

}
