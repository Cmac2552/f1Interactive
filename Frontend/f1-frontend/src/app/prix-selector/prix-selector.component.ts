import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Race } from '../Race';
import { TestService } from '../test.service';
@Component({
  selector: 'app-prix-selector',
  templateUrl: './prix-selector.component.html',
  styleUrls: ['./prix-selector.component.css']
})
export class PrixSelectorComponent {
  races: Race[];
  selectedRace: String;
  years: Number[]= [2022,2021,2020,2019,2018]
  selectedYear: string;
  @Output() raceSelected = new EventEmitter<Race>();
  @Output() yearSelected = new EventEmitter<Number>();
  constructor(private testService: TestService){

  }

  ngOnInit():void{
  }

  private loadRaces(year:Number){
    this.testService.getRaces(year).subscribe(resp =>{this.races = resp;})
  }

  onSelectRace(race: Race){
    this.raceSelected.emit(race)
  }

  onSelectYear(year: Number){
    this.loadRaces(year);
    this.yearSelected.emit(year)
  }

}
