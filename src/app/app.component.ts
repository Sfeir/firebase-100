import { PeopleService } from './shared/people-service/people.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class PeopleAppComponent {

  constructor(
    public people: PeopleService
  ) {
  }
  reset() {
    this.people.reset().subscribe();
  }
}
