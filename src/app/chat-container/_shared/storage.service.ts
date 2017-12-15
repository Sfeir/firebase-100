import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {
  storageRef;

  constructor() {
    // @todo
    this.storageRef = null;
  }

  async store({ file, metadata }) {
    try {

      // @todo
      // @note: this.storageRef returns a Promise !
      const snapshot = null;

      return snapshot.downloadURL;
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
}
