import { Component } from '@angular/core';
import { Graficas } from '../../interfaces/graficas.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public procendencias: Graficas[] = [];
  public plataformas: Graficas[] = [];


  constructor() {
    this.getInfo();
  }

  getInfo() {

    this.procendencias= [
      {
        name: 'Concesionario',
        total: 34
      },
      { 
        name: 'Marca',
        total: 45
      }
    ];
  
    this.plataformas = [
      {
        name: 'crm',
        total: 34
      },
      {
        name: 'web',
        total: 12
      },
    ];
  }


}
