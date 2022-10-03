import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';
import {AuthUser} from "../model/AuthUser.model";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticateService: AuthenticateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authenticateService.token) {
      this.router.navigate(['sign-in']).then((r) => {});
      return of(true);
    }
    // not logged in so redirect to login page with the return url
    return this.authenticateService.getAuthInfo().pipe(
      map(
        (res: any) => {
          if (res && res.status === 200) {
            const authUser: AuthUser = res.data;
            this.authenticateService.setAuthUser(authUser);
            return true;
          } else {
            this.authenticateService.clearSession();
            this.router.navigate(['/sign-in']).then((r) => {});
            return false;
          }
        },
        (error: any) => {
          this.authenticateService.clearSession();
          this.router.navigate(['/sign-in']).then((r) => {});
          return false;
        }
      )
    );
  }
}
