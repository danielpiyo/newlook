import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CategoriesComponent } from '../categories/categories.component';
import { StationComponent } from '../station/station.component';
import { DepartmentComponent } from '../department/department.component';
import { SectionComponent } from '../section/section.component';
import { EquipementComponent } from '../equipement/equipement.component';
import { LoginService } from 'src/app/_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CategoriesComponent, StationComponent,
             DepartmentComponent, SectionComponent,
            EquipementComponent]
})
export class DashboardComponent implements OnInit {

  constructor(private categoryComponent: CategoriesComponent,
              private stationComponent: StationComponent,
              private departmentComponent: DepartmentComponent,
              private loginService: LoginService,
              private router: Router,
              private sectionComponent: SectionComponent,
              private equipementComponent: EquipementComponent) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard', routerLink: '/admin', routerLinkActiveOptions: true,
        icon: 'pi pi-pw pi-file'
      },
      {
        label: 'Requests',
        icon: 'pi pi-pw pi-file',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus', command: (event) => { this.stationComponent.addNewStation(); } },
          { separator: true },
          { label: 'View All', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/requests',
          routerLinkActiveOptions: true},
          { separator: true },
          { label: 'View Open', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/open-requests',
          routerLinkActiveOptions: true},
          { separator: true },
          { label: 'View Assigned', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/assigned-requests',
          routerLinkActiveOptions: true},
          { separator: true },
          { label: 'View Escalated', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/escalated-requests',
          routerLinkActiveOptions: true},
          { separator: true },
          { label: 'View Closed', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/closed-requests',
          routerLinkActiveOptions: true}
        ]
      },
      {
        label: 'Departments',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus',  command: (event) => { this.departmentComponent.addNewDepartment(); } },
          { separator: true },
          { label: 'View All', icon: 'pi pi-fw pi-external-link' , routerLink: '/admin/department',
          routerLinkActiveOptions: true }
        ]
      },
      // {
      //   label: 'Regions',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //     { label: 'New', icon: 'pi pi-fw pi-plus', command: (event) => { this.sectionComponent.addNewSection(); } },
      //     { separator: true },
      //     { label: 'View All', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/section',
      //     routerLinkActiveOptions: true  }
      //   ]
      // },
      {
        label: 'Category',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus', command: (event) => { this.categoryComponent.addNewCategory(); } },
          { separator: true },
          { label: 'View', icon: 'pi pi-fw pi-external-link' , routerLink: '/admin/categories',
          routerLinkActiveOptions: true}
        ]
      },
      // {
      //   label: 'Equipements/ Items',
      //   icon: 'pi pi-fw pi-cog',
      //   items: [
      //     { label: 'New', icon: 'pi pi-fw pi-plus', command: (event) => { this.equipementComponent.addNewEquipement(); }  },
      //     { separator: true },
      //     { label: 'View All', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/equipements',
      //     routerLinkActiveOptions: true , },
      //     { label: 'Allocated', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/equi-allocated' },
      //     { label: 'In Store', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/equi-store' },
      //     { label: 'Under Repair', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/equi-repaire' }
      //   ]
      // },
      {
        label: 'Users',  routerLink: '/admin/users',  icon: 'pi pi-fw pi-plus-users'},
      {
        label: 'Reports',
        icon: 'pi pi-fw pi-cog',
         items: [
           { label: 'EquipementLogs', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/log-truck'  },
           { separator: true },
           { label: 'Allocated Equipements', icon: 'pi pi-fw pi-external-link', routerLink: '/admin/reports' }
         ]
        //   { separator: true },
        //   { label: 'Category', icon: 'pi pi-fw pi-plus' },
        //   { separator: true },
        //   { label: 'Equipement', icon: 'pi pi-fw pi-external-link' },
        //   { separator: true },
        //   { label: 'Model', icon: 'pi pi-fw pi-external-link' }
        // ]
      }
    ];
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}


