import { Injectable } from '@angular/core';
import { backendConfig } from '../../../backend-config';
import { Trabajador } from '../models/trabajador';
import { EmpleadoDTO } from '../models/empleadoDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {
  private apiURL = `${backendConfig.apiUrl}/empleados`; //Esta URL es la de la api cogido del fichero y concatenado
  constructor(private http: HttpClient) { } //Esto devuelve un Observable (). 
  //Un observable es como un mensajero, desde el servicio enviamos datos al componente cuando estén preparados.


  //Métodos de Empleado

  //Obtener todos los empleados
  getAllEmpleados(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.apiURL);
  }

  //Obtener los empleados por ID
  getEmpleadoById(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiURL}/${id}`)
  }

  //Crear un empleado
  createEmpleado(empleado: EmpleadoDTO): Observable<EmpleadoDTO> {
    return this.http.post<EmpleadoDTO>(`${this.apiURL}`, empleado);
  }

  //Actualiar un empleado
  updateEmpleado(id: number, empleado: EmpleadoDTO): Observable<EmpleadoDTO> {
    return this.http.put<EmpleadoDTO>(`${this.apiURL}/${id}`, empleado);
  }

  //Eliminar un empleado
  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  //Buscar por nombre
  searchByName(nombre: string): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiURL}/nombre/${nombre}`);
  }
  //Buscar por edad
  searchByEdad(edad: number): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiURL}/edad/${edad}`);
  }

  //Buscar por salario superior a x
  searchBySuperiorASalario(salario: number): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiURL}/salariosup/${salario}`);
  }

  //Buscar por salario inferior a x
  searchByInferiorASalario(salario: number): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiURL}/salariosinf/${salario}`);
  }

  //Buscar entre salarios
  findByEntreSalarios(salarioA: number, salarioB: number): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(
      `${this.apiURL}/salariosbet/${salarioA}/${salarioB}`
    );
  }


}




