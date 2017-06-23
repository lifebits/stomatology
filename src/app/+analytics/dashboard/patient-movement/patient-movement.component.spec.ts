import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdCardModule } from '@angular/material';

import { PatientMovementComponent } from './patient-movement.component';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';
import { ChartsService } from 'app/services/chart/charts.service';

describe('PatientMovementComponent', () => {
   let component: PatientMovementComponent;
   let fixture: ComponentFixture<PatientMovementComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, MdCardModule ],
         declarations: [ PatientMovementComponent ],
         providers: [ DateRangeService, ChartsService ]
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
