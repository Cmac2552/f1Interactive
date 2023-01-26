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
  getDrivers(){
    return this.http.get<BasicDriver[]>('http://localhost:5000/drivers');
  }
  getRaces(){
    return this.http.get<Race[]>('http://localhost:5000/races');
  }
  getImage(driver1:BasicDriver, driver2:BasicDriver, race:Race){
    return this.http.get<any>('http://localhost:5000/data/'+driver1.abbreviation+'/'+driver2.abbreviation+'/'+ race.name);
  }
}

