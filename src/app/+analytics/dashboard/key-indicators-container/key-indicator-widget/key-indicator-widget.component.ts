import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-key-indicator-widget',
   templateUrl: './key-indicator-widget.component.html',
   styleUrls: ['./key-indicator-widget.component.scss']
})
export class KeyIndicatorWidgetComponent {

   @Input()
   title: string;

   @Input()
   value: number;

   @Input()
   percentage: number;

   constructor() {}

}
