import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FacDetOrService {

  constructor( private http: HttpClient ) { }
  public urlBase = 'http://localhost:8080/api/reports';

  getInfo() {
    return this.http.get(this.urlBase);
  }

  getDataBy(base: string,term: string) {
    return this.http.get(`${this.urlBase}/${base}/${term}`);
  }
}
