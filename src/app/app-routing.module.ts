import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { StationComponent } from './components/admin/station/station.component';
import { DepartmentComponent } from './components/admin/department/department.component';
import { SectionComponent } from './components/admin/section/section.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { EquipementComponent } from './components/admin/equipement/equipement.component';
import { UsersComponent } from './components/admin/users/users.component';
import { EquipementStoreComponent } from './components/admin/equipement/equipement-store/equipement-store.component';
import { EquipementRepaireComponent } from './components/admin/equipement/equipement-repaire/equipement-repaire.component';
import { EquipementAllocatedComponent } from './components/admin/equipement/equipement-allocated/equipement-allocated.component';
import { UserDashboardComponent } from './components/users/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './components/users/user-home/user-home.component';
import { UserRequestComponent } from './components/users/user-request/user-request.component';
import { AdminGuard } from './_guard/admin.guard';
import { UserGuard } from './_guard/user.guard';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { LogsTrackComponent } from './components/admin/logs-track/logs-track.component';
import { AdminLoginComponent } from './components/login/admin-login/admin-login.component';
import { AllRequestComponent } from './components/admin/requests/all-request/all-request.component';
import { AssignedRequestComponent } from './components/admin/requests/assigned-request/assigned-request.component';
import { OpenRequestComponent } from './components/admin/requests/open-request/open-request.component';
import { EscalatedRequestComponent } from './components/admin/requests/escalated-request/escalated-request.component';
import { ClosedRequestComponent } from './components/admin/requests/closed-request/closed-request.component';
import { DeletedRequestComponent } from './components/admin/requests/deleted-request/deleted-request.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signin', component: AdminLoginComponent},
 {path: 'admin', component: DashboardComponent, canActivateChild: [AdminGuard], children: [
  {path: '', component: AdminHomeComponent, canActivate: [AdminGuard]},
  // Requests
  {path: 'requests', component: AllRequestComponent, canActivate: [AdminGuard]},
  {path: 'assigned-requests', component: AssignedRequestComponent, canActivate: [AdminGuard]},
  {path: 'open-requests', component: OpenRequestComponent, canActivate: [AdminGuard]},
  {path: 'escalated-requests', component: EscalatedRequestComponent, canActivate: [AdminGuard]},
  {path: 'closed-requests', component: ClosedRequestComponent, canActivate: [AdminGuard]},
  {path: 'deleted-requests', component: DeletedRequestComponent, canActivate: [AdminGuard]},
  // //
  {path: 'station', component: StationComponent, canActivate: [AdminGuard]},
  {path: 'department', component: DepartmentComponent, canActivate: [AdminGuard]},
  {path: 'section', component: SectionComponent, canActivate: [AdminGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard]},
  {path: 'equipements', component: EquipementComponent, canActivate: [AdminGuard]},
  {path: 'equi-store', component: EquipementStoreComponent, canActivate: [AdminGuard]},
  {path: 'equi-repaire', component: EquipementRepaireComponent, canActivate: [AdminGuard]},
  {path: 'equi-allocated', component: EquipementAllocatedComponent, canActivate: [AdminGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AdminGuard]},
  {path: 'log-truck', component: LogsTrackComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: ''}
 ]},
 {path: 'user', component: UserDashboardComponent, canActivate: [UserGuard], children: [
   {path: '', component: UserHomeComponent, canActivate: [UserGuard]},
   {path: 'userRequest', component: UserRequestComponent, canActivate: [UserGuard]},
   {path: '**', redirectTo: ''}
 ]},
 {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
