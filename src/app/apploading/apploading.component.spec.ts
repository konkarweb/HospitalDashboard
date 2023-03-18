import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApploadingComponent } from './apploading.component';

describe('ApploadingComponent', () => {
  let component: ApploadingComponent;
  let fixture: ComponentFixture<ApploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApploadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
