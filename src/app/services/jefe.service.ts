import { Injectable } from '@angular/core';
import { backendConfig } from '../../../backend-config';
import { Trabajador } from '../models/trabajador';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JefeService {
  private apiURL = `${backendConfig.apiUrl}/jefes`; //Esta URL es la de jefes cogido del fichero y concatenado
  constructor(private http: HttpClient) { } //Esto devuelve un Observable (). 
  //Un observable es como un mensajero, desde el servicio enviamos datos al componente cuando estén preparados.


  //Métodos de Jefe

  //Crear un Jefe
  createJefe(jefe: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(this.apiURL, jefe)
  }

  //Eliminar un Jefe
  deleteJefe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  //Actualizar un Jefe
  updateJefe(id: number, jefe: Trabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.apiURL}/${id}`, jefe);
  }

  //Obtener todos los Jefes
  getAllJefes(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.apiURL);
  }

  //Obtener los Jefes por ID
  getJefeById(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiURL}/${id}`)
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
