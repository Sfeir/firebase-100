import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AuthService } from '../_shared/auth.service';
import { MessagingService } from '../_shared/messaging.service';
import { User } from './../_shared/models/user.class';
import { Message } from './../_shared/models/message.class';
import { StorageService } from '../_shared/storage.service';
import { DatabaseService } from './../_shared/database.service';

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
    public databaseService: DatabaseService,
    public authService: AuthService,
    public storage: StorageService,
    public messaging: MessagingService,
    public route: ActivatedRoute,
    public zone: NgZone
  ) {}

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    if (!this.user) {
      throw Error('User is not logged in.');
    }

    this.thread = this.route.params
      .map(params => params.id)
      .flatMap(uuid => this.databaseService.get({ uuid }));
  }

  async sendMessage(message) {
    let fileUrl = '';
    if (this.fileInfo) {
      fileUrl = await this.storage.store(this.fileInfo);
    }
    this.databaseService.save({
      user: this.user,
      message,
      fileUrl
    });
  }

  async onFileSelected(fileInfo) {
    this.fileInfo = fileInfo;
  }
}
