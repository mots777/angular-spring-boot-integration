import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  storedPath: string;

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authenticationService.isUserLoggerIn()
    .do(isLoggedIn => {
      if(!isLoggedIn) {
        this.storedPath = state.url;
        this.routerService.routeToLogin();
      } else {
        if(this.storedPath) {
          this.routerService.routeByUrl(this.storedPath);
          this.storedPath = undefined;
        }
      }
    });
  }
}
