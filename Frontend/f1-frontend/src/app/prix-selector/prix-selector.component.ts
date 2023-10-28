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
  years: number[]= [2023, 2022, 2021, 2020, 2019, 2018];
  sessions : String[] = ['Race', 'Qualifying'];
  selectedSession:String;
  selectedYear: string;
  raceEnabled=false;
  sessionEnabled = false;
  @Output() raceSelected = new EventEmitter<Race>();
  @Output() yearSelected = new EventEmitter<number>();
  @Output() sessionSelected = new EventEmitter<String>();
  constructor(private testService: TestService){

  }

  ngOnInit():void{
  }

  private loadRaces(year:number){
    this.testService.getRaces(year).subscribe(resp =>{this.races = resp;})
  }

  onSelectRace(race: Race){
    this.raceSelected.emit(race)
    this.sessionEnabled =true;
    
  }

  onSelectYear(year: number){
    this.loadRaces(year);
    this.yearSelected.emit(year)
    this.raceEnabled =true;
    this.sessionEnabled =false;
    
  }
  
  onSelectSession(session: String){
    this.sessionSelected.emit(session);
  }
}
