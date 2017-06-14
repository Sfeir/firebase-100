import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class FirebasePeopleService {

    random$: EventEmitter<{}>;
    update$: EventEmitter<{}>;

    constructor(public db: AngularFireDatabase) {
        this.random$ = new EventEmitter<{}>();
        this.update$ = new EventEmitter<{}>();
    }

    fetch() {
        return this.db.list('/');
    }

    fetchRandom() {
        this.db.list('/').subscribe((data: any[]) => {
            this.random$.next(data[(Math.random() * data.length) | 0]);
        });
        return this.random$;
    }

    fetchOne(id: string) {
        return this.db.object(`/${id}`);
    }

    delete(id: string) {

    }

    update(person: any) {
        this.db.object(`/${person.$key}`).update(person);
        return this.update$;
    }

    create(person) {

    }
}
