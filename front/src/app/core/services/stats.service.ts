import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getStatsByQuestion(id: number): Observable<any>{
    const stats = this.http.get(`${this.apiUrl}/preguntas/preguntas/${id}/estadisticas`)
    return stats
  }
}
