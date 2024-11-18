import { Injectable } from '@angular/core';
import { backendConfig } from '../../../backend-config';
import { Trabajador } from '../models/trabajador';
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
  getEmpleadoById(id: number): Observable<Trabajador>{
    return this.http.get<Trabajador>(`${this.apiURL}/${id}`) 
  }

//Crear un empleado
  createEmpleado(empleado: Trabajador): Observable<Trabajador>{
    return this.http.put<Trabajador>(this.apiURL, empleado)
  }

//Actualiar un empleado
  updateEmpleado(id: number, empleado:Trabajador): Observable<Trabajador>{
    return this.http.put<Trabajador>(`${this.apiURL}/${id}`, empleado);
  }

//Eliminar un empleado
  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }



}




