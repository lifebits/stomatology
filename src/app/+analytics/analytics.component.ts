import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
   selector: 'app-analytics',
   templateUrl: './analytics.component.html',
   styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

   constructor(
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {

      iconRegistry
         .addSvgIconSetInNamespace('analytics',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sets/analytics-icon.svg'));
   }

   ngOnInit() {
   }

}
