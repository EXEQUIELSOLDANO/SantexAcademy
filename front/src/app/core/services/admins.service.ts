import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
