import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
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
}
