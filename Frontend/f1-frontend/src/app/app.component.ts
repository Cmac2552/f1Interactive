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
  year: Number;
  constructor(private test: TestService, private sanitizer: DomSanitizer){}
  ngOnInit(){
    // this.test.getImage().subscribe((baseImage:any)=>{
    //   let objectURL= 'data:image/png;base64,'+baseImage.image;
    //   this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    // })
  }

  setDriver1(driver1: BasicDriver){
    this.driver1 = driver1;
  }

  setDriver2(driver2: BasicDriver){
    this.driver2 = driver2;
  }

  setRace(race: Race){
    this.race = race;
  }

  setYear(year:Number){
    this.year = year;
  }

  compare(){
    this.test.getImage(this.driver1, this.driver2, this.race, this.year).subscribe((baseImage:any)=>{
      let objectURL= 'data:image/png;base64,'+baseImage.image;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }
}
