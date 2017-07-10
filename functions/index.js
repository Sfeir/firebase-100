"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendMessageNotification = functions.database.ref('/thread/{threadUID}').onWrite(event => {
    if (!event.data.exists()) {
        console.log('Exit when the data is deleted.');
        return;
    }
    const data = event.data.val();
    const payload = {
        notification: {
            title: `New message from ${data.user.displayName}`,
            body: data.message
        }
    };

    admin.database().ref('/notifications/tokens').once('value', snap => {
        const tokens = [];
        snap.forEach(child => {
            tokens.push(child.val());
            return false;
        });

        console.log('Found tokens: ', tokens);

        admin.messaging().sendToDevice(tokens, payload)
            .then(response => console.log('successfully sent message:', response))
            .catch(error => console.error('Error sending message:', error));
    });

});