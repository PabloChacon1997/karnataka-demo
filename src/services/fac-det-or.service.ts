import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FacDetOrService {

  constructor( private http: HttpClient ) { }
  // public url = 'jdbc:oraclethin:@//192.168.43.173:1521/dbttik';

  async getInfo() {
    
  }
}
