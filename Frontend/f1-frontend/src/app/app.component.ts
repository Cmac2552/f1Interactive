import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { BasicDriver } from './BasicDriver';
import { DomSanitizer } from '@angular/platform-browser';
import { Race } from './Race';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  thumbnail: any;
  driver1: BasicDriver;
  driver2: BasicDriver;
  race: Race;
  year: number;
  session: String;
  clicked: Boolean;
  runIt:Boolean
  driverCounter: number;
  constructor(private test: TestService, private sanitizer: DomSanitizer){}
  ngOnInit(){
    this.runIt=true;
    this.driverCounter =0
  
  }

  enableCompare(){
    if(this.driver1&& this.driver2 && this.race && this.year && this.session){
      console.log('bye')
      this.runIt =false;
    }
    else{
      this.runIt =true;
    }
  }

  setDriver1(driver1: BasicDriver){
    this.driver1 = driver1;
    this.enableCompare();
  }

  setDriver2(driver2: BasicDriver){
    this.driver2 = driver2;
    this.enableCompare();
  }

  setRace(race: Race){
    this.race = race;
    this.enableCompare();
  }

  setYear(year:number){
    this.year = year;
    this.driverCounter =0;
    this.enableCompare();
  }
  
  setSession(session: String){
    this.session = session;
    this.enableCompare();
  }

  compare(){
    this.clicked =true
    this.test.getImage(this.driver1, this.driver2, this.race, this.year, this.session).subscribe((baseImage:any)=>{
      console.log(baseImage)
      if(!baseImage.error){
        let objectURL= 'data:image/png;base64,'+baseImage.image;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      }else{
        this.thumbnail = baseImage.error
      }
    })
  }
}
