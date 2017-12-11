import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate() {
    this.router.navigate(['/login']);
    return false;
  }
}
