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

  // Método para abrir el formulario de creación
  abrirFormularioCrear(): void {
    this.mostrarFormulario = true;
    this.nuevoJefe = new Trabajador({ rol: 'Jefe' }); // Resetea el formulario
    console.log('Formulario abierto para crear un nuevo jefe.');
  }

  // Método para cerrar el formulario sin guardar
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoJefe = new Trabajador({ rol: 'Jefe' }); // Resetea el formulario
    console.log('Formulario cerrado.');
  }

  // Método para crear un nuevo jefe
  crearJefe(): void {
    console.log('Valores del formulario:', this.nuevoJefe); // Depurar valores antes de enviar
  
    this.jefeService.createJefe(this.nuevoJefe).subscribe({
      next: (jefeCreado) => {
        alert('Jefe creado exitosamente');
        this.jefes.push(jefeCreado);
        this.cerrarFormulario();
      },
      error: (err) => console.error('Error al crear el jefe:', err),
    });
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
  

  //Método que llama al servicio y pasa los datos a un array
  getAllJefes(): void {
    this.jefeService.getAllJefes().subscribe({
      next: (data) => {
        this.jefes = data; //Metemos los datos en el array
      }
    });
  }


}