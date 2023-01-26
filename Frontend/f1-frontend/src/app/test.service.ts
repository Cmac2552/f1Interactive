import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { seb } from './seb';
import {BasicDriver} from './BasicDriver'
import {Race} from './Race'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestSeb(){
    return this.http.get<seb>('http://localhost:5000/');
  }
  getDrivers(year:Number){
    return this.http.get<BasicDriver[]>('http://localhost:5000/drivers/'+String(year));
  }
  getRaces(year:Number){
    return this.http.get<Race[]>('http://localhost:5000/races/'+String(year));
  }
  getImage(driver1:BasicDriver, driver2:BasicDriver, race:Race, year:Number){
    return this.http.get<any>('http://localhost:5000/data/'+driver1.abbreviation+'/'+driver2.abbreviation+'/'+ race.name+'/'+String(year));
  }
}



