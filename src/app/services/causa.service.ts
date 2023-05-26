import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Causa } from '../models/causa.model';


@Injectable({
  providedIn: 'root'
})
export class CausaService {
  url?:string;
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  constructor(private http: HttpClient) { 
    this.url = `http://localhost:8081/`;
  }
  listar():Observable<Causa[]>{
    return this.http.get<Causa[]>(`${this.url}causa`);
  }
  agregar(causa: Causa): Observable<Causa> {
    return this.http.post<Causa>(`${this.url}causa`, causa, this.httpOptions);
  }
  editar(causa: Causa): Observable<Causa> {
    return this.http.put<Causa>(`${this.url}causa/${causa.id}`, causa, this.httpOptions);
  }

  eliminar(causa:Causa): Observable<Causa> {
    return this.http.delete<Causa>(`${this.url}causa/${causa.id}`);
  }
}

