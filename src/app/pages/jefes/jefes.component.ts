import { Component } from '@angular/core';
import { Trabajador } from '../../models/trabajador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jefes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.css'
})
export class JefesComponent {
  //Creamos los jefes
  static jefe1: Trabajador = new Trabajador('David', 25, new Date('2023-05-05'), null, 2000, 'Jefe', new Date('2023-06-05'));
  static jefe2: Trabajador = new Trabajador('Juan', 22, new Date('2024-05-05'), null, 1000, 'Jefe', new Date('2024-06-05'));
  static jefe3: Trabajador = new Trabajador('Pepe', 23, new Date('2024-07-05'), null, 1300, 'Jefe', new Date('2024-06-08'));
  static jefe4: Trabajador = new Trabajador('Antonio', 24, new Date('2024-01-05'), null, 1200, 'Jefe', new Date('2024-06-05'));

  //Los insertamos en un array
  jefes: Trabajador[] = [
    JefesComponent.jefe1,
    JefesComponent.jefe2,
    JefesComponent.jefe3,
    JefesComponent.jefe4
  ];
}