import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdDatepickerModule, MdNativeDateModule, MdInputModule } from '@angular/material';

import { DateRangeSelectionComponent } from './date-range-selection.component';
import { DateRangeService } from './date-range.service';
import { AnalyticsService } from '../../analytics.service';

describe('DateRangeSelectionComponent', () => {
   let component: DateRangeSelectionComponent;
   let fixture: ComponentFixture<DateRangeSelectionComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdDatepickerModule, MdNativeDateModule, MdInputModule, BrowserAnimationsModule ],
         declarations: [ DateRangeSelectionComponent ],
         providers: [ AnalyticsService, DateRangeService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(DateRangeSelectionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
