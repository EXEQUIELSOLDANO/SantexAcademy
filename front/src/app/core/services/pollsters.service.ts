import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
