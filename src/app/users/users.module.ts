import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdIconModule, MdButtonModule, MdInputModule } from '@angular/material';

import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdIconModule,
      MdButtonModule,
      MdInputModule
   ],
   declarations: [
      LoginModalComponent
   ],
   providers: [
      AuthService,
      AuthGuard
   ]
})
export class UsersModule {
}
