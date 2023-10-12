import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGeneral } from 'src/app/modules/create-user/create-user.component';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getAdmins(): Observable<any>{
    const admins = this.http.get(`${this.apiUrl}/admins/obtener-admin`)
    return admins
  }

  submitAdmin(usuario: any): Observable<any> {
    return  usuario = this.http.post(`${this.apiUrl}/admins/crear`, usuario)
   }

  deleteAdmin(id: Number): Observable<any>{
    const res = this.http.delete(`${this.apiUrl}/admins/eliminar/${id}`, { responseType: 'text' });
    return res;
  }

  updateAdmin(usuario: any, id: Number):Observable<any>{
    return usuario = this.http.put(`${this.apiUrl}/admins/actualizar/${id}`,usuario)
  }

  getAdminById(idusuario:any):Observable<UserGeneral>{
    const admin = this.http.get<UserGeneral>(`${this.apiUrl}/admins/obtener/${idusuario}`)
    return admin
}
}
