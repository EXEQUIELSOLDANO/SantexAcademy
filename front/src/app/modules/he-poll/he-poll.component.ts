import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from 'src/app/core/services/poll.service';


@Component({
  selector: 'app-he-poll',
  templateUrl: './he-poll.component.html',
  styleUrls: ['./he-poll.component.css']
})
export class HePollComponent implements OnInit {
redirectToPollsterDashboard() {
throw new Error('Method not implemented.');
}
  questions = [];
  answerOptions = [];
  respuestas: any[] = []
  respuesta = '';
  opcionRespuesta = 0

  constructor(private router: Router, private pollService: PollService ){
    
   }

  ngOnInit(): void {
    this.getQuestions()
    this.getAnswerOptions()
  }

  getQuestions(){
    this.pollService.getQuestions().subscribe({
      next: (res) => {
        this.questions = res
        console.log(this.questions)
      }
    })
  }

  getAnswerOptions() {
    this.pollService.getAnswerOptions().subscribe({
      next: (options) => {
        this.answerOptions = options;
        console.log(this.answerOptions);
      }
    });
  }

  agregarRespuesta(pregunta_id: number, opcionRespuestaId: number){
    let respuesta;
  
    if(opcionRespuestaId === 1){
      respuesta = {
        pregunta_id,
        encuestado_id: 1,
        opcion_respuesta_id: opcionRespuestaId,
        respuesta_abierta: this.respuesta
      }  
    }else{
      respuesta = {
        pregunta_id,
        encuestado_id: 1,
        opcion_respuesta_id: opcionRespuestaId,
        respuesta_abierta: ''
      }
    }
  
    this.respuestas = this.respuestas.filter(resp => resp.pregunta_id !== pregunta_id); // Elimina la respuesta anterior para esta pregunta
    this.respuestas.push(respuesta);
    console.log(this.respuestas);
  }
  
  enviarRespuestas(){
    this.respuestas.forEach( respuesta => {
      this.pollService.saveAnswer(respuesta).subscribe({
        next: () => {
          console.log('Respuesta guardada')
          this.router.navigate(['send-poll-success'])

        },
        error: (error) => {
          console.log(error)
        }
      })
    });
  }
  redirectToVolver() {
    this.router.navigate(['dashboard-pollster'])
  }
}