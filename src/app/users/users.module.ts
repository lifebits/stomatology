import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdButtonModule, MdInputModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdIconModule,
      MdButtonModule,
      MdInputModule
   ],
   declarations: [
      LoginComponent
   ],
   providers: [
      AuthService
   ]
})
export class UsersModule {
}
