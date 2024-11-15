import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trabajador } from '../../models/trabajador';
import { DepartamentosComponent } from '../departamentos/departamentos.component';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

//Creamos los empleados
static emp1: Trabajador = new Trabajador('Ana', 25, new Date('2023-05-05'), null, 2000, 'Empleado', null, DepartamentosComponent.depar);
static emp2: Trabajador = new Trabajador('Maria', 22, new Date('2024-05-05'), null, 1000, 'Empleado',null, DepartamentosComponent.it );
static emp3: Trabajador = new Trabajador('Victoria', 23, new Date('2024-07-05'), null, 1300, 'Empleado',null, DepartamentosComponent.recursosHumanos  );
static emp4: Trabajador = new Trabajador('Lucia', 24, new Date('2024-01-05'), null, 1200, 'Empleado', null, DepartamentosComponent.finanzas  );

//Los insertamos en un array
empleados: Trabajador[] = [
  EmpleadosComponent.emp1,
  EmpleadosComponent.emp2,
  EmpleadosComponent.emp3,
  EmpleadosComponent.emp4
];
}
