import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';
import { backendConfig } from '../../../backend-config';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private apiURL = `${backendConfig.apiUrl}/departamentos`; //Esta URL es la de la api cogido del fichero y concatenado

  constructor(private http: HttpClient) { }


  getAllDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiURL);
  }

  getDepartamentoById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiURL}/${id}`);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiURL, departamento);
  }

  updateDepartamento(id: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiURL}/${id}`, departamento);
  }

  deleteDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
