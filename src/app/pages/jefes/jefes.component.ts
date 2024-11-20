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

}