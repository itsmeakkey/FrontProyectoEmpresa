import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  departamentos: Departamento[] = []; //Array de departamentos

  constructor(private departamentoService: DepartamentoService) { }
  ngOnInit(): void {
    this.getAllDepartamentos(); //Obtenemos todos los departamentos al iniciar el componente
  }

  // Método para obtener los departamentos
  getAllDepartamentos(): void {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data; //Asignamos los datos al array
      }
    });
  }
}
