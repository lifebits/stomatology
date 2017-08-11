import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdIconModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';

import { ReferralIncComponent } from './referral-inc.component';
import { DateRangeService } from '../../components/date-range-selection/date-range.service';

describe('ReferralIncComponent', () => {
   let component: ReferralIncComponent;
   let fixture: ComponentFixture<ReferralIncComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ RouterTestingModule, ReactiveFormsModule, HttpModule, ComponentsModule,
            BrowserAnimationsModule, MdInputModule, MdIconModule ],
         declarations: [ ReferralIncComponent ],
         providers: [ DateRangeService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ReferralIncComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
