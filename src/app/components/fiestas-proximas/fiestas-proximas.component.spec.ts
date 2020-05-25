import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiestasProximasComponent } from './fiestas-proximas.component';

describe('FiestasProximasComponent', () => {
  let component: FiestasProximasComponent;
  let fixture: ComponentFixture<FiestasProximasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiestasProximasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiestasProximasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
