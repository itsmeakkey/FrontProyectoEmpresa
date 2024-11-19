import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trabajador } from '../../models/trabajador';
import { DepartamentosComponent } from '../departamentos/departamentos.component';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit { //OnInit nos permite por ejemplo: cargar empleados al iniciar el componente
  //Creamos un array de empeados
  empleados: Trabajador[] = [];

  constructor(private empleadoService: EmpleadoService) { }
  ngOnInit(): void {
    this.getAllEmpleados(); //Cuando cargue el componente, hacemos la llamada para mostrar todos los empleados
  }

  // Obtener todos los empleados del servicio
  getAllEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (data) => {
        this.empleados = data; //Metemos los datos en el array
      }
    });
  }



}
