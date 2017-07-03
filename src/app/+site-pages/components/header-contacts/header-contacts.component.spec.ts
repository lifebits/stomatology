import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule, MdMenuModule, MdSnackBarModule } from '@angular/material';

import { HeaderContactsComponent } from './header-contacts.component';

import { AuthService } from 'app/users/auth/auth.service';
import { NotificationService } from 'app/services/notification/notification.service';

describe('HeaderContactsComponent', () => {
   let component: HeaderContactsComponent;
   let fixture: ComponentFixture<HeaderContactsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, RouterTestingModule, MdIconModule, MdMenuModule, MdSnackBarModule ],
         declarations: [ HeaderContactsComponent ],
         providers: [ AuthService, NotificationService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(HeaderContactsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
