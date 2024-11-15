import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../../models/tarea';
import { EmpleadosComponent } from '../empleados/empleados.component';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  //Creamos las tareas con un empleado concreto asignado
  static tar1: Tarea = {
    nombre: 'Administrar Bases de Datos',
    fechaCreacion: new Date('2023-05-05'),
    fechaFin: null,
    entregadoATiempo: true,
    fechaEstimada: new Date('2023-05-05'),
    empleado: EmpleadosComponent.emp1
  };

  static tar2: Tarea = {
    nombre: 'Programación Backend',
    fechaCreacion: new Date('2023-05-05'),
    fechaFin: null,
    entregadoATiempo: true,
    fechaEstimada: new Date('2023-05-05'),
    empleado: EmpleadosComponent.emp2
  };

  static tar3: Tarea = {
    nombre: 'Diseño Frontend',
    fechaCreacion: new Date('2023-05-05'),
    fechaFin: null,
    entregadoATiempo: true,
    fechaEstimada: new Date('2023-05-05'),
    empleado: EmpleadosComponent.emp3
  };

  static tar4: Tarea = {
    nombre: 'Testing',
    fechaCreacion: new Date('2023-05-05'),
    fechaFin: null,
    entregadoATiempo: true,
    fechaEstimada: new Date('2023-05-05'),
    empleado: EmpleadosComponent.emp4
  };

  tareas: Tarea[]; // Creamos el array de tareas

  constructor() {
    this.tareas = [
      TareasComponent.tar1,
      TareasComponent.tar2,
      TareasComponent.tar3,
      TareasComponent.tar4
    ];
  }
}


