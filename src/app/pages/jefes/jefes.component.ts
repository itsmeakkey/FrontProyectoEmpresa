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
  //Para probar el botón
  decirHola(): void {
    console.log('FUNCIONA!');
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
    if (this.nuevoJefe.nombre && this.nuevoJefe.edad && this.nuevoJefe.salario) {
      this.jefeService.createJefe(this.nuevoJefe).subscribe({
        next: (jefeCreado) => {
          console.log('Jefe creado exitosamente:', jefeCreado);
          this.jefes.push(jefeCreado); // Añade el nuevo jefe a la lista
          this.cerrarFormulario(); // Cierra el formulario tras guardar
        },
        error: (err) => console.error('Error al crear el jefe:', err)
      });
    } else {
      console.error('Por favor, completa todos los campos obligatorios.');
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