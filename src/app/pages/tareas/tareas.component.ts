import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {
  mostrarFormulario: boolean = false;
  tareas: Tarea[] = [];
  empleados: Trabajador[] = [];
  nuevaTarea: Tarea = {
    id: 0,
    nombreTarea: '',
    fechaCreacion: new Date(),
    fechaFin: null,
    entregadoATiempo: false,
    fechaEstimada: new Date(),
    empleadoTO: new Trabajador({
      id: 0,
      nombre: '',
      edad: 0,
      salario: 0,
      fechaAlta: null,
      fechaBaja: null
    }),
  }

  constructor(
    private tareaService: TareaService,
    private empleadoService: EmpleadoService
  ) { }
  ngOnInit(): void {
    this.getAllTareas();
    this.getAllEmpleados();
  }

  //CRUD
  // Guardar una departamento 
  saveTarea(): void {
    const datosEnviados = {
      ...this.nuevaTarea,
      empleadoTO: { ...this.nuevaTarea.empleadoTO },
    };

    if (this.nuevaTarea.id) {
      // Actualización
      this.tareaService.updateTarea(this.nuevaTarea.id, datosEnviados).subscribe({
        next: () => {
          alert('Tarea actualizada correctamente');
          this.getAllTareas();
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al actualizar la tarea: ' + err.message),
      });
    } else {
      // Creación
      this.tareaService.createTarea(datosEnviados).subscribe({
        next: (tareaCreada) => {
          alert('Tarea creada correctamente');
          this.tareas.push(tareaCreada);
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al crear la tarea: ' + err.message),
      });
    }
  }


  //Método que obtiene las tareas del servicio
  getAllTareas(): void {
    this.tareaService.getAllTareas().subscribe({
      next: (data) => {
        this.tareas = data;
      }
    });
  }

  //Eliminar una tarea
  deleteTarea(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.tareaService.deleteTarea(id).subscribe({
        next: () => {
          alert('Tarea eliminada correctamente');

          this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        },
        error: (err) => alert('Error al eliminar'),
      });
    }
  }

  //----------------------------------------------------------------------------------------


  // Obtener todos los empleados
  getAllEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => alert('Error al cargar los empleados:'),
    });
  }

  // Abrir el formulario de creación nueva tarea
  abrirFormularioCrear(): void {
    this.nuevaTarea;
    this.mostrarFormulario = true;
  }

  // Abrir el formulario para editar una tarea
  abrirFormularioEditar(tarea: Tarea): void {
    this.nuevaTarea = {
      id: tarea.id,
      nombreTarea: tarea.nombreTarea,
      fechaCreacion: tarea.fechaCreacion,
      fechaFin: tarea.fechaFin,
      entregadoATiempo: tarea.entregadoATiempo,
      fechaEstimada: tarea.fechaEstimada,
      empleadoTO: new Trabajador({
        id: tarea.empleadoTO.id,
        nombre: tarea.empleadoTO.nombre,
        edad: tarea.empleadoTO.edad,
        fechaAlta: tarea.empleadoTO.fechaAlta,
        fechaBaja: tarea.empleadoTO.fechaBaja,
        salario: tarea.empleadoTO.salario,
        rol: tarea.empleadoTO.rol || 'Jefe',
      }),
    };
    this.mostrarFormulario = true;
  }
  // Cerrar el formulario
  cerrarFormulario(): void {
    this.nuevaTarea;
    this.mostrarFormulario = false
  }
}