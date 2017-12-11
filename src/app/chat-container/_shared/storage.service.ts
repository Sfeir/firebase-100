import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {
  storageRef;

  constructor() {
    this.storageRef = firebase.storage().ref();
  }

  async store({ file, metadata }) {
    try {
      const snapshot = await this.storageRef
        .child(`thread/${file.name}`)
        .put(file, metadata);

      return snapshot.downloadURL;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
}
