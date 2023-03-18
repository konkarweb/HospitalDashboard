import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDetailsTableComponent } from './vaccine-details-table.component';

describe('VaccineDetailsTableComponent', () => {
  let component: VaccineDetailsTableComponent;
  let fixture: ComponentFixture<VaccineDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

