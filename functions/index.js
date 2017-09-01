"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const emoji = require('node-emoji')

exports.emojify = functions.database.ref('/thread/{userUID}/{messageUID}')
    .onWrite(event => {

        const messageNode = event.data.val();
        console.log('messageNode', messageNode);

        messageNode.message = emoji.emojify(messageNode.message);

        const emojified = {};
        const userUID = event.params.userUID;
        const messageUID = event.params.messageUID;
        emojified[`/thread/${userUID}/${messageUID}`] = messageNode;

        console.log('emojify', `/thread/${userUID}/${messageUID}`, emojified);
        return admin.database().ref().update(emojified);
    });

//...

exports.sendMessageNotification = functions.database.ref('/thread/{userUUID}/{messageUUID}')
    .onWrite(event => {
        if (!event.data.exists()) {
            console.log('Exit when the data is deleted.');
            return;
        }
        const data = event.data.val();
        const token = 'fpHnYekEbDE:APA91bF7qkwX-E3D...';
        const payload = {
            notification: {
                title: 'Wassim Chegham replied',
                body: 'Holla!'
            }
        };

        return admin.database().ref('/notifications/tokens').once('value', snap => {
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