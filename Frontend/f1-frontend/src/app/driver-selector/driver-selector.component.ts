import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import {FormControl} from '@angular/forms'
import { map, Observable, startWith, of } from 'rxjs';
import { BasicDriver } from '../BasicDriver';
import { MatOption } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-driver-selector',
  templateUrl: './driver-selector.component.html',
  styleUrls: ['./driver-selector.component.css']
})
export class DriverSelectorComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  title = 'f1-frontend';
  drivers: BasicDriver[];
  color ="blue";
  constructor(private testService: TestService){

  }

  ngOnInit():void{
    this.loadDrivers();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    

  }
  
  private loadDrivers(){
    this.testService.getDrivers().subscribe(resp =>{this.drivers = resp;})
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.drivers.map(name => name.lastName).filter(option => option.toLowerCase().includes(filterValue));
  }
  OnDriverSelected(option: MatAutocompleteSelectedEvent){
    console.log(option.option.value);
    this.color = '#'+this.drivers.filter(driver => driver.lastName===option.option.value)[0].teamColor
  }
}
