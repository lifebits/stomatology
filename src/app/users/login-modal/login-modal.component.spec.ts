import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdInputModule } from '@angular/material';

import { AuthComponent } from './login-modal.component';

describe('AuthComponent', () => {
   let component: AuthComponent;
   let fixture: ComponentFixture<AuthComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdIconModule, MdInputModule ],
         declarations: [ AuthComponent ],
         providers: [ Router ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AuthComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
