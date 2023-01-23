import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { seb } from './seb';
import {FormControl} from '@angular/forms'
import { map, Observable, startWith } from 'rxjs';
import { BasicDriver } from './BasicDriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
