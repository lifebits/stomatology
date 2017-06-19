import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMovementComponent } from './patient-movement.component';

describe('PatientMovementComponent', () => {
  let component: PatientMovementComponent;
  let fixture: ComponentFixture<PatientMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
