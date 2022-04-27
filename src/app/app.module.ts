import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartComponent } from './components/base-chart/base-chart.component';
import { TableComponent } from './components/table/table.component';
import { HorizontalChartComponent } from './components/horizontal-chart/horizontal-chart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseChartComponent,
    TableComponent,
    HorizontalChartComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
