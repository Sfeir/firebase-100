'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const emoji = require('node-emoji');

exports.emojify = functions.database
  .ref('/thread/{userUUID}/{messageUUID}')
  .onWrite(event => {
    const messageNode = event.data.val();
    console.log('messageNode', messageNode);

    messageNode.message = emoji.emojify(messageNode.message);

    const emojified = {};
    const userUUID = event.params.userUUID;
    const messageUUID = event.params.messageUUID;
    emojified[`/thread/${userUUID}/${messageUUID}`] = messageNode;

    console.log('emojify', `/thread/${userUUID}/${messageUUID}`, emojified);

    // @todo
    // return admin.database()...
  });

module.exports.people = require('./server/server.js').people;
