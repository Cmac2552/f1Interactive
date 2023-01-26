import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Race } from '../Race';
import { TestService } from '../test.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-prix-selector',
  templateUrl: './prix-selector.component.html',
  styleUrls: ['./prix-selector.component.css']
})
export class PrixSelectorComponent {
  races: Race[];
  selectedValue: string;
  @Output() raceSelected = new EventEmitter<Race>();
  constructor(private testService: TestService){

  }
  ngOnInit():void{
    this.loadRaces();
    

  }

  private loadRaces(){
    this.testService.getRaces().subscribe(resp =>{this.races = resp;})
  }

  onSelect(race: Race){
    this.raceSelected.emit(race)
  }

}
