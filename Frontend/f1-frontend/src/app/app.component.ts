import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { seb } from './seb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'f1-frontend';
  seb: seb;
  constructor(private testService: TestService){

  }

  ngOnInit():void{
    this.loadSeb();

  }
  
  private loadSeb(){
    this.testService.getTestSeb().subscribe(resp => {this.seb= resp});
  }




}
