import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from './models/user.class';
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(public router: Router) {}

  getAuth(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  async login(provider, userCred?) {
    let user = {} as User;
    try {
      if (provider === 'email') {

        // @todo firebase.auth()...
        const response = null;

        // when logging in via email, use the email adress as a "displayName"
        user = new User(
          response.email,
          response.email,
          'assets/images/avatar_circle_blue_512dp.png'
        );
      } else {

        // @todo firebase.auth()...
        const response = null;

        user = new User(
          response.user.displayName,
          response.user.email,
          response.user.photoURL
        );
      }

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/chat']);
    } catch (e) {
      console.error(e);
    }
    return user;
  }

  async logout() {
    // @todo

    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }
}
