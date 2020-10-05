import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../user-management-service/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private loginService:UserService){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      if(this.loginService.loggedIn()){
        if(sessionStorage.getItem('userRole')=='CUSTOMER_USER'){
          return of(true);
        }
      }
      else{
        return of(false);
      }
  }
  
}
