import { Component, OnInit } from '@angular/core';
import { ReferralService } from './referral.service';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

   data;

   constructor(
      private referral: ReferralService) {

   }

   ngOnInit() {
      this.referral.getDirectedPatients().subscribe(
         result => {
            this.data = result;
            console.log(result);
         }
      );
   }

}
