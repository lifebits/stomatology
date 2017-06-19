import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-key-indicator-widget',
   templateUrl: './key-indicator-widget.component.html',
   styleUrls: ['./key-indicator-widget.component.scss']
})
export class KeyIndicatorWidgetComponent implements OnInit {

   @Input()
   title: string;

   @Input()
   value: number;

   @Input()
   percentage: number;

   constructor() {
   }

   ngOnInit() {
   }

}
