import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {

   constructor(
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {

      iconRegistry
         .addSvgIconSetInNamespace('main',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sets/main-icon.svg'))
         .addSvgIcon('map-marker',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/map-marker-radius.svg'));

   }

   // title = 'app works!';

}
