import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {
//Creamos un array de Tareas
tareas: Tarea[] = [];

  constructor(private tareaService: TareaService) {}
  ngOnInit(): void {
    this.getAllTareas(); //Cuando cargue el componente, hacemos la llamada para mostrar todos los empleados
  }
  //Método que obtiene las tareas del servicio
  getAllTareas(): void {
    this.tareaService.getAllTareas().subscribe({
      next: (data) => {
        this.tareas = data; //Metemos los datos en el array
      }
    });
  }

}