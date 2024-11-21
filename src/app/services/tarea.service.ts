import { Injectable } from '@angular/core';
import { backendConfig } from '../../../backend-config';
import { Tarea } from '../models/tarea';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TareaService {
  private apiURL = `${backendConfig.apiUrl}/tareas`; //Esta URL es la de tareas cogido del fichero y concatenado
  constructor(private http: HttpClient) { } //Esto devuelve un Observable (). 
  //Un observable es como un mensajero, desde el servicio enviamos datos al componente cuando estén preparados.


//Métodos de Tarea

//Obtener todas las Tareas
  getAllTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiURL);
  }

//Obtener los Tareas por ID
  getTareaById(id: number): Observable<Tarea>{
    return this.http.get<Tarea>(`${this.apiURL}/${id}`) 
  }

//Crear una Tarea
  createTarea(tarea: Tarea): Observable<Tarea>{
    return this.http.post<Tarea>(this.apiURL, tarea)
  }

//Actualizar una Tarea
  updateTarea(id: number, tarea:Tarea): Observable<Tarea>{
    return this.http.put<Tarea>(`${this.apiURL}/${id}`, tarea);
  }

//Eliminar una Tarea
  deleteTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}