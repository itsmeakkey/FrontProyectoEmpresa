import { Component } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { CommonModule } from '@angular/common';
import { Trabajador } from '../../models/trabajador';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {
  departamentos: Departamento[];//Array de departamentos
  constructor() {
    //Creamos los jefes
    const jefe1 = new Trabajador('David', 25, new Date('2023-05-05'), null, 2000, 'Jefe', new Date ('2023-06-05'));
    const jefe2 = new Trabajador('Juan', 22, new Date('2024-05-05'), null, 1000, 'Jefe', new Date ('2024-06-05'));
    const jefe3 = new Trabajador('Pepe', 23, new Date('2024-07-05'), null, 1300, 'Jefe', new Date ('2024-06-08'));
    const jefe4 = new Trabajador('Antonio', 24, new Date('2024-01-05'), null, 1200, 'Jefe', new Date ('2024-06-05'));

    //Creamos los departamentos
      this.departamentos = [
        { nombre: 'depar' ,jefe: jefe1},
        { nombre: 'Recursos Humanos',jefe: jefe2 },
        { nombre: 'Finanzas',jefe: jefe4 },
        { nombre: 'IT',jefe: jefe3 }
      ]
    


}
}