import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdInputModule, MdDatepickerModule, MdNativeDateModule, MdMenuModule } from '@angular/material';

import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DateRangeSelectionComponent } from './components/date-range-selection/date-range-selection.component';

import { DateRangeService } from './components/date-range-selection/date-range.service';

describe('AnalyticsComponent', () => {
   let component: AnalyticsComponent;
   let fixture: ComponentFixture<AnalyticsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            HttpModule,
            BrowserAnimationsModule,
            RouterTestingModule,
            ReactiveFormsModule,
            MdIconModule,
            MdInputModule,
            MdDatepickerModule,
            MdNativeDateModule,
            MdMenuModule
         ],
         declarations: [
            AnalyticsComponent,
            AnalyticsHeaderComponent,
            AnalyticsNavigatorComponent,
            DateRangeSelectionComponent
         ],
         providers: [ DateRangeService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AnalyticsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
