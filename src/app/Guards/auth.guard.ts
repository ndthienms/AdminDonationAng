import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token') != null){
        let roles = route.data['permittedRoles'] as Array<string>;
        if(roles){
          var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
          var userRole = payLoad['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          for(let role of roles){
            if(userRole==role){
              return true;
            }
          }
          this.router.navigate(['/forbidden']);
          return false;
        }
        return true;
      }
      else{
        this.router.navigateByUrl('/');
        return false;
      }
  }
};
