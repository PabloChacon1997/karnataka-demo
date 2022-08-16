import { Component } from '@angular/core';
import { Graficas } from '../../interfaces/graficas.interfaces';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public procendencias: ChartData<'bar'> = { labels: [], datasets: [] };
  public plataformas: ChartData<'bar'>= {labels: [], datasets: [] };


  constructor() {
    this.getInfo();
  }

  getInfo() {

    this.procendencias= {
      labels: ['Origen'],
      datasets: [
        { data: [ 704 ], label: 'Concesionaria' },
        { data: [ 19 ], label: 'Marca' },
      ]
    }

  
    this.plataformas = {
      labels: ['Plataforma'],
      datasets: [
        { data: [ 127 ], label: 'crm' },
        { data: [ 1 ], label: 'web' },
      ]
    }
    
  }


}
