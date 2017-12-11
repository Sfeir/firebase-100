import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Message } from './models/message.class';
import { User } from './models/user.class';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {
  dbRef: any;

  constructor(public zone: NgZone) {}

  get(opts?): Observable<Message[]> {
    const thread$ = new Subject<Message[]>();
    let path = '/public';
    if (opts.uuid) {
      path = `/thread/${opts.uuid}`;
    }

    this.dbRef = firebase.database().ref(path);
    this.dbRef
      .orderByChild('date')
      .limitToLast(20)
      .on('value', snapshot => {
        const threads = [];
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          threads.push(childData);

          return false;
        });
        thread$.next(threads);

        //   console.log('calling next', threads);
        //   this.zone.run(() => thread$.next(threads));
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
