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
    let result = {} as any;
    try {
      if (provider === 'email') {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(userCred.email, userCred.password);
        // when logging in via email, use the email adress as a "displayName"
        user = new User(
          response.email,
          response.email,
          'assets/images/avatar_circle_blue_512dp.png'
        );
      } else {
        result = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        user = new User(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );
      }

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/chat']);
    } catch (e) {
      console.error('can not log in');
      console.error(e);
    }
    return user;
  }

  async logout() {
    await firebase.auth().signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }
}
