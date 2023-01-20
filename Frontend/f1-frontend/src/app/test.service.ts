import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { seb } from './seb';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestSeb(){
    return this.http.get<seb>('http://localhost:5000/');
  }
}

