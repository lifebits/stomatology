import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdCardModule } from '@angular/material';

import { ReferralComponent } from './referral.component';

describe('ReferralComponent', () => {
   let component: ReferralComponent;
   let fixture: ComponentFixture<ReferralComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ RouterTestingModule, MdCardModule ],
         declarations: [ ReferralComponent ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ReferralComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
