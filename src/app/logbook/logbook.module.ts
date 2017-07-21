import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { FileUploadModule } from 'ng2-file-upload';

import { LogbookUploadComponent } from './logbook-upload/logbook-upload.component';

@NgModule({
   imports: [
      CommonModule,
      MdButtonModule,
      FileUploadModule
   ],
   declarations: [
      LogbookUploadComponent
   ]
})
export class LogbookModule {
}
