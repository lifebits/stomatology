import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdIconModule } from '@angular/material';

import { HeaderLogoComponent } from './header-logo.component';

describe('HeaderLogoComponent', () => {
   let component: HeaderLogoComponent;
   let fixture: ComponentFixture<HeaderLogoComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ MdIconModule ],
         declarations: [ HeaderLogoComponent ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(HeaderLogoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
