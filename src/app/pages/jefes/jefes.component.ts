import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JefeService } from '../../services/jefe.service';

@Component({
  selector: 'app-jefes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.css'
})
export class JefesComponent implements OnInit {
  mostrarFormulario: boolean = false; // Controla la visibilidad del formulario
  nuevoJefe: Trabajador = new Trabajador({ rol: 'Jefe' }); // Instancia inicial para el nuevo jefe
  //Creamos un array de jefes
  jefes: Trabajador[] = [];

  constructor(private jefeService: JefeService) { }
  ngOnInit(): void {
    this.getAllJefes(); //Cuando cargue el componente, hacemos la llamada al back para mostrar todos los empleados
  }

  //CRUD
  // Método para crear o actualizar un nuevo jefe
  saveJefe(): void {
    // Si el id existe actualizamos, si no, creamos uno nuevo
    if (this.nuevoJefe.id) {
      // Actualización
      this.jefeService.updateJefe(this.nuevoJefe.id, this.nuevoJefe).subscribe({
        next: () => {
          alert('Jefe actualizado correctamente');
          this.getAllJefes();
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al actualizar jefe.'),
      });
    } else {
      // Creación
      this.jefeService.createJefe(this.nuevoJefe).subscribe({
        next: (jefeCreado) => {
          alert('Jefe creado correctamente');
          this.jefes.push(jefeCreado);
          this.cerrarFormulario();
        },
        error: (err) => alert('Error al crear el jefe.'),
      });
    }
  }

  //Método para actualizar un jefe
  //Recoger los datos del jefe en el formulario
  editJefe(jefe: Trabajador): void {
    this.mostrarFormulario = true;
    this.nuevoJefe = { ...jefe };//Realiza una copia de jefe para trabajar con sus datos

  }
  //Eliminar un jefe 
  deleteJefe(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este jefe?')) {
      this.jefeService.deleteJefe(id).subscribe({ //Llamada al servicio
        next: () => {
          alert('Jefe eliminado correctamente');
          //Quita de la tabla el jefe eliminado
          this.jefes = this.jefes.filter(jefe => jefe.id !== id);
        },
        error: (err) => alert('Error al eliminar'),
      });
    }
  }
  //----------------------------------------------------------------------------------------

  // Método para abrir el formulario de creación
  abrirFormularioCrear(): void {
    this.mostrarFormulario = true;
    this.nuevoJefe = new Trabajador({ rol: 'Jefe' }); // Resetea el formulario
  }

  // Método para cerrar el formulario sin guardar
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoJefe = new Trabajador({ rol: 'Jefe' }); // Resetea el formulario
  }

  //Método que llama al servicio y trae todos los jefes
  getAllJefes(): void {
    this.jefeService.getAllJefes().subscribe({
      next: (data) => {
        this.jefes = data; //Metemos los datos en el array
      }
    });
  }
  //----------------------------------------------------------------------------------------
  /*BÚSQUEDAS*/

  //Por nombre
  searchByName(): void {
    // Si el campo de búsqueda está vacío, mostramos todos los jefes
    if (!this.nuevoJefe.nombre.trim()) { //Trim quita espacios al principio y al final de la cadena
      this.getAllJefes();
      return;
    }

    this.jefeService.searchByName(this.nuevoJefe.nombre).subscribe({
      next: (result) => (this.jefes = result),
    });
  }

  //Por edad
  searchByEdad(): void {
    // Si el campo de búsqueda está vacío, mostramos una lista
    if (!this.nuevoJefe.edad) {
      this.getAllJefes();
      return;
    }

    this.jefeService.searchByEdad(this.nuevoJefe.edad).subscribe({
      next: (result) => (this.jefes = result),
    });
  }


  //MÉTODOS DE BÚSQUEDA POR SALARIO
  //Esto lo hemos hecho para que no referencien al mismo atributo salario, y así no duplicar el input en ambos
  salarioSuperior: number | null = null;
  salarioInferior: number | null = null;

  // Por salario superior a x
  searchBySuperiorASalario(): void { //Si no hay salario, se muestra toda la lista.
    if (this.salarioSuperior === null) {
      this.getAllJefes();
      return;
    }

    this.jefeService.searchBySuperiorASalario(this.salarioSuperior).subscribe({
      next: (result) => (this.jefes = result),
    });
  }

  // Por salario superior a x
  searchByInferiorASalario(): void {
    if (this.salarioInferior === null) {
      this.getAllJefes();
      return;
    }

    this.jefeService.searchByInferiorASalario(this.salarioInferior).subscribe({
      next: (result) => (this.jefes = result),
    });
  }

  //Variables para el salario mínimo y el máximo
  salarioMinimo: number = 0;
  salarioMaximo: number = 0;

  // Entre salarios
  buscarPorRangoDeSalarios(): void {
    // Verificamos que no sean nulos y que el mínimo nunca puede ser mayor que máximo
    if (this.salarioMinimo !== null && this.salarioMaximo !== null && this.salarioMinimo > this.salarioMaximo) {
      alert('Introduce salarios válidos.');
      return;
    }

    // Llamamos al servicio para realizar la búsqueda
    this.jefeService.findByEntreSalarios(this.salarioMinimo, this.salarioMaximo).subscribe({
      next: (jefes) => {
        this.jefes = jefes;
      },
    });
  }
}
