import { User } from './user.class';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router) {
    }

  getAuth() {
    return this.afAuth.authState;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  async login(provider, userCred?) {
    let user = {} as User;
    let result = {} as any;
    try {

      if (provider === 'email') {
        const response = await this.afAuth.auth.signInWithEmailAndPassword(userCred.email, userCred.password);
        // when logging in via email, use the email adress as a "displayName"
        user = new User(response.email, response.email, 'assets/images/avatar_circle_blue_512dp.png');
      }
      else {
        result = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        user = new User(result.user.displayName, result.user.email, result.user.photoURL);
      }

      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/chat']);
    }
    catch(e) {
      console.error('can not log in');
      console.error(e);
    }
    return user;
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }

}
