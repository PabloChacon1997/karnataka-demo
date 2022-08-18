import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';

import { FacDetOrService } from '../../../services/fac-det-or.service';
import { empresas } from '../../data/empresas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @Input() plataformas$!: Observable<any>;
  public procendencias: ChartData<'bar'> = { labels: [], datasets: [] };
  public plataformas: ChartData<'bar'>= {labels: [], datasets: [] };
  public canales: ChartData<'bar'>= {labels: [], datasets: [] };


  public empresas: any[] = empresas;

  public empresasDetalle: any = {};

  public procedenciasSpinner: boolean = false;
  public plataformasSpinner: boolean = false;

  public dataOrigen: any[] = [];
  public dataPlataforma: any[] = [];

  openCoverages = false;
  indexSelectedCoverage = 1;

  constructor( private facDetOrService:FacDetOrService ) {
    this.getInitialization();
  }
  
  ngOnInit() {
    this.getDataByEmpresa();
    this.empresas.forEach((covenant:any) => {
      covenant.isExpanded = false;
    });
  }

  async getInitialization() {

    this.procendencias = {
      labels: ['Origen'],
      datasets: [
        { data: [0], label: 'MARCA' },
        { data: [0], label: 'CONCESIONARIOS' },
      ]
    }
     
    this.plataformas = {
      labels: ['Plataforma'],
      datasets: [
        { data: [0], label: 'crm' },
        { data: [0], label: 'web' },
        { data: [0], label: 'reweb' },
      ]
    }

    this.canales = {
      labels: ['Canal'],
      datasets: [
        { data: [400], label: 'PRESENCIAL CLIENTE' },
        { data: [1200], label: 'DIGITAL' },
        { data: [100], label: 'PAGINA WEB' },
      ]
    }
  }



  async getDataByOrigen() {
    this.procedenciasSpinner = true;
    await this.facDetOrService.getDataBy('origen', 'MARCA').subscribe((res: any) => {
      this.dataOrigen = res;
      
      let numero = this.getSumOrigen();
      this.procendencias.labels = ['Origen'];
      this.procendencias.datasets[0] ={
        data: [ numero ],
        label: 'MARCA',
      }
    });
        
    await this.facDetOrService.getDataBy('origen', 'CONCESIONARIOS').subscribe((res: any) => {
      this.dataOrigen = res;
      // console.log(this.dataOrigen);
      
      let numero = this.getSumOrigen();
      this.procendencias.labels = ['Origen'];
      this.procendencias.datasets[1] ={
        data: [ numero ],
        label: 'CONCESIONARIOS',
      }
      this.procedenciasSpinner = false;
    });
  }

  
  async getDataByPlataforma() {
    this.plataformasSpinner = true;
    await this.facDetOrService.getDataBy('plataforma', 'crm').subscribe( (res:any) => {
      this.dataPlataforma = res;

      let numero = this.getSumPlataforma();
      this.plataformas.labels = ['Plataforma'];
      this.plataformas.datasets[0] = {
        data: [ numero ],
        label: 'crm',
      }
      this.plataformasSpinner = false
    });
    await this.facDetOrService.getDataBy('plataforma', 'web').subscribe( (res:any) => {
      this.dataPlataforma = res;
      
      let numero = this.getSumPlataforma();
      this.plataformas.labels = ['Plataforma'];
      this.plataformas.datasets[1] = {
        data: [ numero ],
        label: 'web',
      }
    });
    await this.facDetOrService.getDataBy('plataforma', 'reweb').subscribe( (res:any) => {
      this.dataPlataforma = res;

      let numero = this.getSumPlataforma();
      this.plataformas.labels = ['Plataforma'];
      this.plataformas.datasets[2] = {
        data: [ numero ],
        label: 'reweb',
      }

    });
  }

  getDataByEmpresa() {
    this.empresas.forEach( async (empresa, i) => {
      let contCompleta = 0;
      let contIncompleta = 0;
      await this.facDetOrService.getDataBy('empresa', empresa.nombre).subscribe( (res:any) => {
        // console.log(res);
        this.empresasDetalle = res;
        this.empresasDetalle.forEach((r:any) => {
          if (r.conNomEstadoComploFact === 'COMPLETA') {
            contCompleta += 1;
          } else {
            contIncompleta += 1;
          }
        });
        empresa.numCompletas = contCompleta;
        empresa.numIncompletas = contIncompleta;
      });
    });    
  }
  
  getSumOrigen(): number {
    let suma = 0;
    this.dataOrigen.forEach( d => {
      suma += d.ven_CANTIDAD_SUGERIDA;
    });
    return suma;
  }

  getSumPlataforma(): number {
    let suma = 0;
    this.dataPlataforma.forEach( d => {
      suma += d.ven_CANTIDAD_SUGERIDA;
    });
    return suma;
  }
  


}
