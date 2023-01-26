import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
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
  myControlDisabled = new FormControl('');
  filteredOptions: Observable<string[]>;
  title = 'f1-frontend';
  drivers: BasicDriver[] =[];
  headshot='';
  currYear:Number;
  @Output() driverSelected = new EventEmitter<BasicDriver>();
  @Input() year: Number;
  constructor(private testService: TestService){
  }

  ngOnInit():void{
    this.myControlDisabled.disable()
  }

  ngOnChanges(changes: any){
    this.headshot=''
    this.myControl.reset('')
    if(changes.year.currentValue !== undefined )
    {
      this.loadDrivers(this.year);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  }
  
  private loadDrivers(year: Number){
    this.drivers =[]
    this.testService.getDrivers(year).subscribe(resp =>{this.drivers = resp;})
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.drivers.map(name => name.lastName).filter(option => option.toLowerCase().includes(filterValue));
  }
  onDriverSelected(option: MatAutocompleteSelectedEvent){
    let driver = this.drivers.filter(driver => driver.lastName===option.option.value)[0]
    this.headshot = driver.headshotURL
    this.driverSelected.emit(driver)
  }

}
