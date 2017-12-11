import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AuthService } from '../_shared/auth.service';
import { User } from './../_shared/models/user.class';
import { Message } from './../_shared/models/message.class';

@Component({
  selector: 'sfeir-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('section') sectionRef;

  thread: Observable<Message[]>;
  user: User;
  fileInfo: { file; metadata };

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public zone: NgZone
  ) {}

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    if (!this.user) {
      throw Error('User is not logged in.');
    }
  }

}
