import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../_shared/auth.service';
import { MessagingService } from '../_shared/messaging.service';
import { User } from './../_shared/user.class';
import { StorageService } from '../_shared/storage.service';
import { DatabaseService } from './../_shared/database.service';
import { Message } from './../_shared/message.class';
@Component({
  selector: 'sfeir-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('section') sectionRef;

  thread: Observable<Message[]>;
  user: User;
  fileInfo: {file; metadata};
  
  constructor(
    public databaseService: DatabaseService,
    public authService: AuthService,
    public storage: StorageService,
    public messaging: MessagingService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {

    this.user = this.authService.getLoggedUser();
    if (!this.user) {
      throw Error('User is not logged in.');
    }

    this.thread = this.route.params
        .map(params => params.id)
        .do(val => {
          console.log('id', val);
          return val;
        })
        .flatMap(uuid => this.databaseService.get({uuid}))
        .do(val => console.log('fb', val));
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
