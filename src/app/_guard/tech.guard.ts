import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class TechGuard implements CanActivate {
  currentUser: User;

  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser.role === 'technician') {
      return true;
    }
    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
