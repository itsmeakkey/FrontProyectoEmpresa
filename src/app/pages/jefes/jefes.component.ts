import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador';
import { CommonModule } from '@angular/common';
import { JefeService } from '../../services/jefe.service';

@Component({
  selector: 'app-jefes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.css'
})
export class JefesComponent implements OnInit {
//Creamos un array de jefes
jefes: Trabajador[] = [];

  constructor(private jefeService: JefeService) {}
  ngOnInit(): void {
    this.getAllJefes(); //Cuando cargue el componente, hacemos la llamada para mostrar todos los empleados
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