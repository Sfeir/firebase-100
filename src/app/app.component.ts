import { PeopleService } from './shared/people-service/people.service';
import { DatabaseService } from './chat-container/_shared/database.service';
import { AuthService } from './chat-container/_shared/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class PeopleAppComponent {

  constructor(
    public authService: AuthService,
    public databaseservice: DatabaseService,
    public people: PeopleService
  ) {
  }
  reset() {
    this.people.reset().subscribe();
  }
}
