import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule } from '@angular/material';

import { AnalyticsHeaderComponent } from './analytics-header.component';
import { DateRangeSelectionComponent } from '../date-range-selection/date-range-selection.component';
import { AnalyticsService } from '../../analytics.service';
import { DateRangeService } from '../date-range-selection/date-range.service';


describe('AnalyticsHeaderComponent', () => {
   let component: AnalyticsHeaderComponent;
   let fixture: ComponentFixture<AnalyticsHeaderComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdIconModule, MdDatepickerModule, MdNativeDateModule, MdInputModule, BrowserAnimationsModule ],
         declarations: [ AnalyticsHeaderComponent, DateRangeSelectionComponent ],
         providers: [ AnalyticsService, DateRangeService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AnalyticsHeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
