import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { seb } from './seb';
import {FormControl} from '@angular/forms'
import { map, Observable, startWith } from 'rxjs';
import { BasicDriver } from './BasicDriver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  thumbnail: any;
  constructor(private test: TestService, private sanitizer: DomSanitizer){}
  ngOnInit(){
    this.test.getImage().subscribe((baseImage:any)=>{
      console.log(baseImage)
      let objectURL= 'data:image/png;base64,'+baseImage.image;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }
}
