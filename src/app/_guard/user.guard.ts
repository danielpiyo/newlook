import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  currentToken: string;

  constructor(private router: Router) {
    this.currentToken = JSON.parse(localStorage.getItem('currentToken'));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.currentToken) {
        return true;
      }
      this.router.navigate([''], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
