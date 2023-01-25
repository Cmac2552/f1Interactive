import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixSelectorComponent } from './prix-selector.component';

describe('PrixSelectorComponent', () => {
  let component: PrixSelectorComponent;
  let fixture: ComponentFixture<PrixSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
