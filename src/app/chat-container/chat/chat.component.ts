import { MessagingService } from './../messaging.service';
import { User } from './../login/user.class';
import { StorageService } from './storage.service';
import { 
  Component,
  OnInit, 
  ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './../login/auth.service';
import { Message } from './message.class';

@Component({
  selector: 'sfeir-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('section') sectionRef;

  thread: FirebaseListObservable<any[]>;
  user: User;
  fileInfo: {file; metadata};
  
  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public storage: StorageService,
    public messaging: MessagingService) {
      messaging.register();
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      throw Error('User is not logged in.');
    }

    this.thread = this.db.list('/thread', {
      query: {
        orderBy: 'date',
        limitToLast: 20
      }
    });
  }

  async sendMessage(message) {
    let fileUrl = '';
    if (this.fileInfo) {
      fileUrl = await this.storage.store(this.fileInfo);
    }
    this.thread.push(new Message(this.user, message, new Date().getTime(), fileUrl));
  }

  async onFileSelected(fileInfo) {
    this.fileInfo = fileInfo;
  }

}
