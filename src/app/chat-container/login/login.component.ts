import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'sfeir-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userCred;
  user;

  constructor() {
    this.userCred = {};
    this.user = {};
  }

  ngOnInit() {}
}
