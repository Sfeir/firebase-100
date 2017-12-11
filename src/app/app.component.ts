import { DatabaseService } from './chat-container/_shared/database.service';
import { AuthService } from './chat-container/_shared/auth.service';
import { Component, HostListener } from '@angular/core';
import { MessagingService } from 'app/chat-container/_shared/messaging.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class PeopleAppComponent {
  notifications$: Observable<number>;

  constructor(
    public authService: AuthService,
    public databaseservice: DatabaseService,
    public messages: MessagingService
  ) {
    this.notifications$ = messages.notifications$;
  }
}
