import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard', routerLink: '/user', routerLinkActiveOptions: true,
        icon: 'pi pi-pw pi-file'
      },
      {
        label: 'Requests', routerLink: '/user/userRequest', icon: 'pi pi-pw pi-file'
      }
    ];
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
