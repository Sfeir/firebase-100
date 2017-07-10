importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '295388413389'
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = 'SFEIR Firebase';
    const notificationOptions = {
        body: payload.data.message,
        icon: payload.data.user.photoURL
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});