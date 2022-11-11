import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainChildComponent } from './maintain-child.component';

describe('MaintainChildComponent', () => {
  let component: MaintainChildComponent;
  let fixture: ComponentFixture<MaintainChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
