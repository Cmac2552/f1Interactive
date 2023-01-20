import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { seb } from './seb';
import {FormControl} from '@angular/forms'
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  title = 'f1-frontend';
  seb: seb;
  constructor(private testService: TestService){

  }

  ngOnInit():void{
    this.loadSeb();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }
  
  private loadSeb(){
    this.testService.getTestSeb().subscribe(resp => {this.seb= resp});
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
