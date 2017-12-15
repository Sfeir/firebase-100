'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const emoji = require('node-emoji');

exports.emojify = functions.database
  .ref('/thread/{userUUID}/{messageUUID}')
  .onWrite(event => {
    if (!event.data.exists()) {
      console.log('Exit when the data is deleted.');
      return;
    }

    const messageNode = event.data.val();
    console.log('messageNode', messageNode);

    messageNode.message = emoji.emojify(messageNode.message);

    const emojified = {};
    const userUUID = event.params.userUUID;
    const messageUUID = event.params.messageUUID;
    emojified[`/thread/${userUUID}/${messageUUID}`] = messageNode;

    console.log('emojify', `/thread/${userUUID}/${messageUUID}`, emojified);
    return admin
      .database()
      .ref()
      .update(emojified);
  });

exports.sendMessageNotification = functions.database
  .ref('/thread/{userUUID}/{messageUUID}')
  .onWrite(event => {
    if (!event.data.exists()) {
      console.log('Exit when the data is deleted.');
      return;
    }
    const messageNode = event.data.val();

    const payload = {
      notification: {
        title: `${messageNode.user.displayName} replied`,
        body: `${messageNode.message}`
      }
    };

    return admin
      .database()
      .ref('/notifications/tokens')
      .once('value', snap => {
        const tokens = [];
        snap.forEach(child => {
          tokens.push(child.val());
          return false;
        });

        console.log('Found tokens: ', tokens);

        admin
          .messaging()
          .sendToDevice(tokens, payload)
          .then(response => console.log('successfully sent message:', response))
          .catch(error => console.error('Error sending message:', error));
      });
  });


module.exports.people = require('./server/server.js').people;
