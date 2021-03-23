import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    const token = localStorage.getItem('access_token');
    const tokenPayload = <any>decode(token);

    const hasPermission = <boolean>(tokenPayload.Permissions.split(", ")).includes(role);

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      alert("Khong co quyen ");
      return false;
    }

    return hasPermission;
  }
}
