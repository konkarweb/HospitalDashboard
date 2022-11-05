import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainPatientsComponent } from './maintain-patients.component';

describe('MaintainPatientsComponent', () => {
  let component: MaintainPatientsComponent;
  let fixture: ComponentFixture<MaintainPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
