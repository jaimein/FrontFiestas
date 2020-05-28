import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiestasComponent } from './table-fiestas.component';

describe('TableFiestasComponent', () => {
  let component: TableFiestasComponent;
  let fixture: ComponentFixture<TableFiestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFiestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFiestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
