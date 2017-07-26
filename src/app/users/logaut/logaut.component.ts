import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from 'app/services/notification/notification.service';
import { AuthService } from 'app/users/auth/auth.service';

@Component({
  selector: 'app-logaut',
  templateUrl: './logaut.component.html',
  styleUrls: ['./logaut.component.scss']
})
export class LogautComponent implements OnInit {

  constructor(
     private auth: AuthService,
     private router: Router,
     private notification: NotificationService) {
  }

  ngOnInit() {
     this.auth.logout();
     this.router.navigate(['/'])
        .then(() => this.notification.success('Вы успешно вышли из системы'));
  }

}
