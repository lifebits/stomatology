import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule, MdMenuModule, MdButtonModule } from '@angular/material';

import { AnalyticsHeaderComponent } from './analytics-header.component';
import { DateRangeSelectionComponent } from '../date-range-selection/date-range-selection.component';
import { DateRangeService } from '../date-range-selection/date-range.service';

describe('AnalyticsHeaderComponent', () => {
   let component: AnalyticsHeaderComponent;
   let fixture: ComponentFixture<AnalyticsHeaderComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule,
            MdIconModule, MdDatepickerModule, MdNativeDateModule, MdInputModule, MdMenuModule ],
         declarations: [ AnalyticsHeaderComponent, DateRangeSelectionComponent ],
         providers: [ DateRangeService ]
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
