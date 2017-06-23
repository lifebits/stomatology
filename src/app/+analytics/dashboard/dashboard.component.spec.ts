import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { KeyIndicatorsContainerComponent } from './key-indicators-container/key-indicators-container.component';
import { KeyIndicatorWidgetComponent } from './key-indicators-container/key-indicator-widget/key-indicator-widget.component';
import { PatientMovementComponent } from './patient-movement/patient-movement.component';

import { DateRangeService } from '../components/date-range-selection/date-range.service';
import { ChartsService } from '../../services/chart/charts.service';

describe('DashboardComponent', () => {
   let component: DashboardComponent;
   let fixture: ComponentFixture<DashboardComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, MdCardModule, MdProgressBarModule ],
         declarations: [ DashboardComponent, PatientMovementComponent, KeyIndicatorsContainerComponent, KeyIndicatorWidgetComponent ],
         providers: [ DateRangeService, ChartsService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
