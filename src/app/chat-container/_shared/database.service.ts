import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Message } from './message.class';
import { User } from 'app/chat-container/_shared/user.class';

@Injectable()
export class DatabaseService {
  dbRef: any;

  constructor(public zone: NgZone) {}

  get(opts?) {
    const thread$ = new Subject<Message[]>();
    let path = '/public';
    if (opts.uuid) {
      path = `/thread/${opts.uuid}`;
    }
    let threads = [];

    this.dbRef = firebase.database().ref(path);
    this.dbRef
      .orderByChild('date')
      .limitToLast(20)
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();

          threads.push(childData);

          return false;
        });

        console.log('calling next', threads);
        this.zone.run(() => thread$.next(threads));
      });

    return thread$;
  }

  save({ user, message, fileUrl }) {
    const msg = new Message(user, message, new Date().getTime(), fileUrl);
    this.dbRef.push(msg);
  }

  clear() {
    this.dbRef.remove();
  }
}
