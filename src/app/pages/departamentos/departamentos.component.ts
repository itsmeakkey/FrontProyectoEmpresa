import { Component } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { CommonModule } from '@angular/common';
import { JefesComponent } from '../jefes/jefes.component';


@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, JefesComponent],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {
  //Hemos creado los departamentos con static para poder usarlos de campo en empleado. Con jefe ha pasado igual.
  static depar: Departamento = {
    nombre: 'Depar',
    jefe: JefesComponent.jefe1
  };
  static recursosHumanos: Departamento = {
    nombre: 'Recursos Humanos',
    jefe: JefesComponent.jefe2
  };
  static finanzas: Departamento = {
    nombre: 'Finanzas',
    jefe: JefesComponent.jefe4
  };
  static it: Departamento = {
    nombre: 'IT',
    jefe: JefesComponent.jefe3
  }

  departamentos: Departamento[];//Array de departamentos
  constructor() {
    this.departamentos = [
      DepartamentosComponent.depar,
      DepartamentosComponent.recursosHumanos,
      DepartamentosComponent.finanzas,
      DepartamentosComponent.it
    ];
  }
}