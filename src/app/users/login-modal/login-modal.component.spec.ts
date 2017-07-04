import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdInputModule } from '@angular/material';

import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
   let component: LoginModalComponent;
   let fixture: ComponentFixture<LoginModalComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdIconModule, MdInputModule ],
         declarations: [ LoginModalComponent ],
         providers: [ Router ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(LoginModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
