import { Component, OnInit,Input } from '@angular/core';
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
  public concesionarios: ChartData<'bar'>= {labels: [], datasets: [] };
  
  public total: number = 0;
  public totalCompletas: number = 0;
  public totalIncompletas: number = 0;

  public empresas: any[] = empresas;

  public empresasDetalle: any = {};

  public procedenciasSpinner: boolean = false;
  public plataformasSpinner: boolean = false;
  public empresaSpinner: boolean = false;

  public dataOrigen: any[] = [];
  public dataPlataforma: any[] = [];

  openCoverages = false;
  indexSelectedCoverage = 1;

  constructor( private facDetOrService:FacDetOrService ) {
    this.getInitialization();
  }
  
  ngOnInit() {
    this.getDataByEmpresa();
    this.getDataByOrigen();
    this.getDataByPlataforma();
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

    this.concesionarios.labels = [''];
    this.concesionarios.datasets = [
      {data: [0], label: 'Completa' },
      {data: [0], label: 'Incompleta' },
    ];
    empresas.forEach((empresa) => {
      this.concesionarios.labels?.push(empresa.nombre);
      this.concesionarios.datasets[0].data.push(0);
      this.concesionarios.datasets[1].data.push(0);
    })
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
    });
    setTimeout(() => {
      this.procedenciasSpinner = false;
    }, 50000);
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

    setTimeout(() => {
      this.plataformasSpinner = false;
    }, 50000);
  }

  async getDataByEmpresa() {
    this.empresaSpinner = true;
    this.concesionarios.labels = [];
    this.concesionarios.datasets = [
      {data: [], label: 'Completa' },
      {data: [], label: 'Incompleta' },
    ];
    await this.empresas.forEach( async (empresa, i) => {
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
        this.concesionarios.labels?.push(empresa.nombre);
        this.concesionarios.datasets[0].data.push(empresa.numCompletas);
        this.concesionarios.datasets[1].data.push(empresa.numIncompletas);
        this.totalCompletas += contCompleta;
        this.totalIncompletas += contIncompleta;
        this.total += contCompleta + contIncompleta;
      });
    });
    setTimeout(() => {
      this.empresaSpinner = false
    }, 5000);
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
