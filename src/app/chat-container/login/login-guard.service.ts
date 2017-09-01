import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './../_shared/auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
