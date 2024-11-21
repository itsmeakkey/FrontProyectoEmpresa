import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trabajador } from '../../models/trabajador';
import { Departamento } from '../../models/departamento';
import { EmpleadoDTO } from '../../models/empleadoDTO';
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
  empleados: Trabajador[] = [];
  mostrarFormulario: boolean = false;
  departamentoId: number = 0;
  nuevoEmpleado: Trabajador = new Trabajador({
    id: 0,
    nombre: '',
    edad: 0,
    fechaAlta: null,
    fechaBaja: null,
    salario: 0,
    rol: 'Empleado', // Es un empleado por defecto
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
  saveEmpleado(): void {
    //Primero, buscamos el departamento 
    const departamentoSeleccionado = this.departamentos.find(
      (departamento) => departamento.id === Number(this.departamentoId)  // Nos aseguramos que ambos sean números
    );

    //Si no seleccionas departamento.
    if (!departamentoSeleccionado) {
      alert('Selecciona un departamento antes.');
      return;
    }

    // Creo el objeto empleadoDTO con el JSON que necesita el backend
    const empleadoDTO: EmpleadoDTO = {
      nombre: this.nuevoEmpleado.nombre,
      edad: this.nuevoEmpleado.edad,
      fechaAlta: this.nuevoEmpleado.fechaAlta,
      fechaBaja: this.nuevoEmpleado.fechaBaja,
      salario: this.nuevoEmpleado.salario,
      departamentoTO: {
        id: departamentoSeleccionado.id,  // Solo enviamos el id 
      },
    };


    // Si el empleado tiene un id, es una actualización
    if (this.nuevoEmpleado.id) {
      this.empleadoService.updateEmpleado(this.nuevoEmpleado.id, empleadoDTO).subscribe({
        next: () => {
          alert('Empleado actualizado correctamente');
          this.getAllEmpleados();  // Recargamos las listas
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al actualizar el empleado: ' + JSON.stringify(err)),
      });
    } else {
      // Si no tiene id, es una creación
      this.empleadoService.createEmpleado(empleadoDTO).subscribe({
        next: (empleadoCreado: any) => {
          const trabajadorCreado: Trabajador = {
            id: empleadoCreado.id || 0,
            nombre: empleadoCreado.nombre,
            edad: empleadoCreado.edad,
            fechaAlta: empleadoCreado.fechaAlta,
            fechaBaja: empleadoCreado.fechaBaja,
            salario: empleadoCreado.salario,
            rol: 'Empleado',
            departamentoTO: this.departamentos.find(
              (d) => d.id === empleadoCreado.departamentoTO?.id
            ) || { id: 0, nombre: '', jefeTO: { id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' } },
          };
          alert('Empleado creado correctamente');
          this.empleados.push(trabajadorCreado);  // Añadimos el nuevo empleado
          this.cerrarFormulario();
          // Limpiamos los datos para crear un nuevo empleado
          this.nuevoEmpleado = {
            id: 0,
            nombre: '',
            edad: 0,
            fechaAlta: null,
            fechaBaja: null,
            salario: 0,
            rol: 'Empleado',
            departamentoTO: {
              id: 0,
              nombre: '',
              jefeTO: { id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' },
            },
          };
        },
        error: (err) => alert('Error al crear el empleado: ' + err),
      })
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

  // Formulario para crear empleado
  abrirFormularioCrear(): void {
    // Limpiar los datos para crear un nuevo empleado
    this.nuevoEmpleado = {
      id: 0,
      nombre: '',
      edad: 0,  // Asignar un valor por defecto como 0
      fechaAlta: null,
      fechaBaja: null,
      salario: 0,  // Asignar un valor por defecto como 0
      rol: 'Empleado',
      departamentoTO: {
        id: 0,
        nombre: '',
        jefeTO: { id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' },
      },
    };
    this.mostrarFormulario = true;
  }

  // Formulario para editar un departamento
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
    // Limpiamos los datos para crear un nuevo empleado
    this.nuevoEmpleado = {
      id: 0,
      nombre: '',
      edad: 0,  
      fechaAlta: null,
      fechaBaja: null,
      salario: 0,  
      rol: 'Empleado',
      departamentoTO: {
        id: 0,
        nombre: '',
        jefeTO: { id: 0, nombre: '', edad: 0, fechaAlta: null, fechaBaja: null, salario: 0, rol: 'Jefe' },
      },
    };
    this.mostrarFormulario = false;
  }

}



