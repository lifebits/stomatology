import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdButtonModule, MdInputModule } from '@angular/material';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LogautComponent } from './logaut/logaut.component';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdIconModule,
      MdButtonModule,
      MdInputModule
   ],
   declarations: [
      LoginFormComponent,
      LoginModalComponent,
      LoginComponent,
      LogautComponent,
   ],
   providers: [
      AuthService,
      AuthGuard
   ]
})
export class UsersModule {
}
