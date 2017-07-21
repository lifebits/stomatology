import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/logbook';

@Component({
   selector: 'app-logbook-upload',
   templateUrl: './logbook-upload.component.html',
   styleUrls: ['./logbook-upload.component.scss']
})
export class LogbookUploadComponent implements OnInit {

   uploader: FileUploader = new FileUploader({url: URL});
   hasBaseDropZoneOver: boolean;

   constructor() {
   }

   ngOnInit() {
      this.uploader.onCompleteItem = (item, resp, status, headers) => {
         console.log('ImageUpload:uploaded', item, status);
      };
   }

   fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
   }

}
