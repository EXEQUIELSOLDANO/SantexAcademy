import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StatsService } from 'src/app/core/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  procedencia: any;
  razones: any;
  tipoHospedaje: any;
  solicitaronInfo: any;
  tipoInfoSolicitada: any;
  
  
  constructor(private statsService: StatsService, private router: Router){ }

  statsData = {
    "estadisticas": {
        "4": {
            "total": 3,
            "opcion": 'Cordoba',
            "porcentaje": 40
        },
        "5": {
            "total": 5,
            "opcion": 'Otra ciudad (cba)',
            "porcentaje": 38.46
        },
        "6": {
            "total": 4,
            "opcion": 'Otra provincia',
            "porcentaje": 30.77
        },
        "7": {
            "total": 1,
            "opcion": 'Otro país',
            "porcentaje": 26
        }
    }
  }

  ngOnInit(): void {
    this.stats()
  }

  getStatsData(id: number) {
    // Llama al servicio para obtener los datos de estadísticas por ID
    return this.statsService.getStatsByQuestion(id)
  }

  stats(){
    forkJoin([
      this.getStatsData(3),
      this.getStatsData(6),
      this.getStatsData(8),
      this.getStatsData(12),
      this.getStatsData(13),
    ]).subscribe(([procedenciaData, razonesData, tipoHospedajeData, solicitaronInfoData, tipoInfoSolicitadaData]) => {
      this.procedencia = procedenciaData;
      this.razones = razonesData;
      this.tipoHospedaje = tipoHospedajeData;
      this.solicitaronInfo = solicitaronInfoData;
      this.tipoInfoSolicitada = tipoInfoSolicitadaData;
    });
  }

  redirectTo(){
    this.router.navigate(['dashboard-admin'])
  }
}
