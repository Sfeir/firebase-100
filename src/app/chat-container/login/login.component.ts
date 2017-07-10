import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'sfeir-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: any;
  userCred: any;
  user: any;

  constructor(
    public authService: AuthService,
    public zone: NgZone,
    public router: Router) {

    this.user = {} as any;
    this.userCred = {} as any;  
  }

  ngOnInit() {
    this.authService.getAuth()
      .subscribe( user => {
        this.user = user;
      });
  }
}
