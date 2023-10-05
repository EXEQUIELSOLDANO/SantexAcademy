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
            "porcentaje": 23.08
        },
        "5": {
            "total": 5,
            "porcentaje": 38.46
        },
        "6": {
            "total": 4,
            "porcentaje": 30.77
        },
        "7": {
            "total": 1,
            "porcentaje": 7.69
        }
    }
  }
}
