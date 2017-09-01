import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { environment } from "./../../../environments/environment";

// firebase.initializeApp(environment.firebase, environment.firebase.projectId);

@Injectable()
export class MessagingService {
  messaging: firebase.messaging.Messaging;

  constructor() {
    this.messaging = firebase.messaging();
    this.register();
  }

  async register() {

    try {
      await this.registerSW();
      //...
      await this.messaging.requestPermission();
      console.log("Notification permission granted.");

      const currentToken = await this.messaging.getToken();
      if (this.storeToken(currentToken)) {
        await this.sendTokenToServer(currentToken);
        console.log("Token stored and sent to server.");
      }

      this.registerListeners();
    } catch (err) {
      console.log("Unable to get permission to notify.", err);
      return false;
    }
  }

  async registerSW() {
    try {
      const registration = await navigator.serviceWorker.register(
        "assets/firebase-messaging-sw.js"
      );
      this.messaging.useServiceWorker(registration);
    } catch (e) {
      console.error("ServiceWorker is not supported by this browser.");
      console.log(e);
      return false;
    }
  }

  registerListeners() {
    this.messaging.onTokenRefresh(async arg => {
      /* handle token rotation */ 
    });

    this.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
    });
  }

  storeToken(token) {
    const previousToken = localStorage.getItem('notificationToken');
    if (previousToken === null || previousToken !== token) {
      localStorage.setItem('notificationToken', token);
      return true;
    }
    return false;
  }

  async sendTokenToServer(currentToken) {
    return Promise.resolve(firebase.database().ref('/notifications/tokens').push(currentToken));
  }
}
