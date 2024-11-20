import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { Trabajador } from '../../models/trabajador';
import { DepartamentoService } from '../../services/departamento.service';
import { JefeService } from '../../services/jefe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: Departamento[] = []; // Lista de departamentos
  jefes: Trabajador[] = []; // Lista de jefes 
  mostrarFormulario: boolean = false;
  nuevoDepartamento: Departamento = {
    id: 0, // Inicializamos los valores
    nombre: '',
    jefeTO: new Trabajador({
      id: 0,
      nombre: '',
      edad: 0,
      fechaAlta: null,
      fechaBaja: null,
      salario: 0,
      rol: 'Jefe',
    }),
  };

  constructor(
    private departamentoService: DepartamentoService,
    private jefeService: JefeService
  ) { }

  ngOnInit(): void {
    this.getAllDepartamentos();
    this.getAllJefes(); // Carga los jefes para verlos en el select
  }
  //CRUD

  // Guardar un departamento (crear o editar)
  saveDepartamento(): void {
    const datosEnviados = {
      ...this.nuevoDepartamento, //Clona el departamento
      jefeTO: { ...this.nuevoDepartamento.jefeTO }, // Envía el objeto completo
    };

    if (this.nuevoDepartamento.id) {
      // Actualización
      this.departamentoService.updateDepartamento(this.nuevoDepartamento.id, datosEnviados).subscribe({
        next: () => {
          alert('Departamento actualizado correctamente');
          this.getAllDepartamentos(); //Recargamos las listas
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al actualizar el departamento:'),
      });
    } else {
      // Creación
      this.departamentoService.createDepartamento(datosEnviados).subscribe({
        next: (departamentoCreado) => {
          alert('Departamento creado correctamente');
          this.departamentos.push(departamentoCreado); // Añade el nuevo departamento
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al crear el departamento:'),
      });
    }
  }

  // Obtener todos los departamentos
  getAllDepartamentos(): void {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (data) => (this.departamentos = data),
      error: (err) => alert('Error al cargar los departamentos:'),
    });
  }

  // Eliminar un departamento
  deleteDepartamento(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este departamento?')) {
      this.departamentoService.deleteDepartamento(id).subscribe({
        next: () => {
          alert('Departamento eliminado correctamente');
          this.getAllDepartamentos(); // Recarga la lista
        },
        error: (err) => alert('Error al eliminar el departamento:'),
      });
    }
  }

  //----------------------------------------------------------------------------------------



  // Obtener todos los jefes
  getAllJefes(): void {
    this.jefeService.getAllJefes().subscribe({
      next: (data) => (this.jefes = data),
      error: (err) => alert('Error al cargar los jefes:'),
    });
  }

  // Abrir el formulario para crear un departamento
  abrirFormularioCrear(): void {
    this.nuevoDepartamento;
    this.mostrarFormulario = true;
  }

  // Abrir el formulario para editar un departamento
  abrirFormularioEditar(dpto: Departamento): void {
    this.nuevoDepartamento = {
      id: dpto.id,
      nombre: dpto.nombre,
      jefeTO: new Trabajador({
        id: dpto.jefeTO.id,
        nombre: dpto.jefeTO.nombre,
        edad: dpto.jefeTO.edad,
        fechaAlta: dpto.jefeTO.fechaAlta,
        fechaBaja: dpto.jefeTO.fechaBaja,
        salario: dpto.jefeTO.salario,
        rol: dpto.jefeTO.rol || 'Jefe', // Decimos que es un jefe por defecto
      }),
    };
    this.mostrarFormulario = true;
  }

  // Cerrar el formulario
  cerrarFormulario(): void {
    this.nuevoDepartamento;
    this.mostrarFormulario = false;
  }


}