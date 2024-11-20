import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trabajador } from '../../models/trabajador';
import { Departamento } from '../../models/departamento';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { EmpleadoService } from '../../services/empleado.service';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent implements OnInit { //OnInit nos permite por ejemplo: cargar empleados al iniciar el componente
  departamentos: Departamento[] = []; // Lista de departamentos
  empleados: Trabajador[] = []; //Lista de empleados
  mostrarFormulario: boolean = false;
  nuevoEmpleado: Trabajador = new Trabajador({
    id: 0,
    nombre: '',
    edad: 0,
    fechaAlta: null,
    fechaBaja: null,
    salario: 0,
    rol: 'Empleado', // Es un empleado por defecto
    departamentoId: '',
    departamentoTO: {
      id: 0,
      nombre: '',
      jefeTO: { id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' },
    },
  });


  constructor(
    private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.getAllEmpleados(); //Cuando cargue el componente, hacemos la llamada para mostrar todos los empleados
    this.getAllDepartametos(); //Para poder cargarlos en el select
  }


  //CRUD
  // Guardar un empleado (crear o editar)
  saveEmpleado(): void {
    if (!this.nuevoEmpleado.departamentoTO?.id) { //Te aseguras de que existe el id
      alert('Por favor, selecciona un empleado válido.');
      return;
    }
    const datosEnviados = {
      ...this.nuevoEmpleado, //Clona el empleado
      departamentoTO: { ...this.nuevoEmpleado.departamentoTO }, // Envía el objeto completo
    };

    if (this.nuevoEmpleado.id) {
      // Actualización
      this.empleadoService.updateEmpleado(this.nuevoEmpleado.id, datosEnviados).subscribe({
        next: () => {
          alert('Empleado actualizado correctamente');
          this.getAllEmpleados(); //Recargamos las listas
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al actualizar el empleado:'),
      });
    } else {
      // Creación
      this.empleadoService.createEmpleado(datosEnviados).subscribe({
        next: (empleadoCreado) => {
          alert('Empleado creado correctamente');
          this.empleados.push(empleadoCreado); // Añadimos el nuevo empleado
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al crear el empleado:'),
      });
    }
  }





  //Eliminar un empleado 
  deleteEmpleado(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: () => {
          alert('Empleado eliminado correctamente');
          this.getAllEmpleados(); // Recarga la lista
        },
        error: (err) => alert('Error al eliminar el empleado:'),
      });
    }
  }






  //-------------------------------------------------------------------------------------------

  // Obtener todos los empleados del servicio
  getAllEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (data) => {
        this.empleados = data; //Metemos los datos en el array
      }
    });
  }

  // Obtener todos los departamentos
  getAllDepartametos(): void {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (data) => (this.departamentos = data),
      error: (err) => alert('Error al cargar los departamentos:'),
    });
  }



  // Abrir formulario para crear empleado
  abrirFormularioCrear(): void {
    this.nuevoEmpleado;
    this.mostrarFormulario = true;
  }

  // Abrir el formulario para editar un departamento
  abrirFormularioEditar(emp: Trabajador): void {
    this.nuevoEmpleado = new Trabajador({
      id: emp.id,
      nombre: emp.nombre,
      edad: emp.edad,
      fechaAlta: emp.fechaAlta,
      fechaBaja: emp.fechaBaja,
      salario: emp.salario,
      rol: emp.rol,
      departamentoTO: {
        id: emp.departamentoTO?.id || 0,
        nombre: emp.departamentoTO?.nombre || '',
        jefeTO: emp.departamentoTO?.jefeTO
          ? new Trabajador({
            id: emp.departamentoTO.jefeTO.id,
            nombre: emp.departamentoTO.jefeTO.nombre,
            edad: emp.departamentoTO.jefeTO.edad,
            fechaAlta: emp.departamentoTO.jefeTO.fechaAlta,
            fechaBaja: emp.departamentoTO.jefeTO.fechaBaja,
            salario: emp.departamentoTO.jefeTO.salario,
            rol: emp.departamentoTO.jefeTO.rol || 'Jefe',
          })
          : new Trabajador({ id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' }),
      },
    });

    this.mostrarFormulario = true;
  }
  // Cerrar formulario
  cerrarFormulario(): void {
    this.nuevoEmpleado;
    this.mostrarFormulario = false;
  }

}



