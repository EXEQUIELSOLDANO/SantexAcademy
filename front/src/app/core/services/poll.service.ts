import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = 'http://localhost:3000'
  
  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any>{
    const questions = this.http.get(`${this.apiUrl}/preguntas/preguntas`)
    return questions
  }

  getAnswerOptions(): Observable<any>{
    const answerOptions = this.http.get(`${this.apiUrl}/opcion-respuestas/opcion-respuestas`)
    return answerOptions
  }

  saveAnswer(respuesta: any): Observable<any>{
    return  this.http.post(`${this.apiUrl}/respuestas/enviar-respuestas`, respuesta)
  }
}
