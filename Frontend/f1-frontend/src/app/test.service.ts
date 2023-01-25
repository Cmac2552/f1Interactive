import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { seb } from './seb';
import {BasicDriver} from './BasicDriver'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestSeb(){
    return this.http.get<seb>('http://localhost:5000/');
  }
  getDrivers(){
    return this.http.get<BasicDriver[]>('http://localhost:5000/drivers');
  }
  getImage(){
    return this.http.get<any>('http://localhost:5000/data/HAM/VER');
  }
}

