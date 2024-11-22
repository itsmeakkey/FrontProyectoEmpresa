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
  getTareaById(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiURL}/${id}`)
  }

  //Crear una Tarea
  createTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiURL, tarea)
  }

  //Actualizar una Tarea
  updateTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiURL}/${id}`, tarea);
  }

  //Eliminar una Tarea
  deleteTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  //Tareas asignadas a un empleado específico
  getTareasByEmpleadoId(empleadoId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/${empleadoId}`);
  }

  //Tareas entregadas a tiempo
  getTareasEntregaATiempo(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/tarea/true`);
  }

  //Tareas entregadas fuera de tiempo
  getTareasEntregaADestiempo(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/tarea/false`);
  }

  //Tareas no finalizadas
  getTareasNoFinalizadas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/tarea/nofinalizada`);
  }

  //Tareas entregadas después de una fecha
  getTareasFechaCreacionDespues(fecha: Date): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/fechaDespues/${fecha}`);
  }

  //Tareas entregadas antes de una fecha
  getTareasFechaCreacionAnterior(fecha: Date): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/fechaAnterior/${fecha}`);
  }

  //Tareas entregadas entre dos fechas
  getTareasFechaCreacionEntre(fechaUno: Date, fechaDos: Date): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiURL}/fechaEntre/${fechaUno}/${fechaDos}`);
  }
}