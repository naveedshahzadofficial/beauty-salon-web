import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isAuthorized = this.authService.roles.filter(x => route.data['roles'].includes(x.name)).length > 0;
    if (!isAuthorized)
      this.router.navigate(['client/login']);
    return isAuthorized;
  }

}
