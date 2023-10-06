import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGeneral } from 'src/app/modules/create-user/create-user.component';

@Injectable({
  providedIn: 'root'
})
export class PollstersService {
 
  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getPollsters(): Observable<any>{
    const pollsters = this.http.get(`${this.apiUrl}/pollsters/obtener-pollsters`)
    return pollsters
  }

  submitPollster(usuario: any): Observable<any> {
    return  usuario = this.http.post(`${this.apiUrl}/pollsters/crear`,usuario)
  }

  deletePollster(id: Number): Observable<any>{
    const res = this.http.delete(`${this.apiUrl}/pollsters/eliminar/${id}`, { responseType: 'text' });
    return res;
  }
  updatePollster(usuario: any, id: Number): Observable<any>{
    return usuario = this.http.put(`${this.apiUrl}/pollsters/actualizar/${id}`,usuario)
  }

  getOnePollsterById(idusuario:any):Observable<UserGeneral>{
    const pollster = this.http.get<UserGeneral>(`${this.apiUrl}/pollsters/obtener/${idusuario}`)
    return pollster
  }

}
