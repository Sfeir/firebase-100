export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: '127.0.0.1',
        port: '9000',
        endpoints: {
            allPeople: '/api/peoples',
            onePeople: '/api/peoples/:id',
            randomPeople: '/api/peoples/random'
        }
    },
    firebase: {
        apiKey: "AIzaSyClJyRZYlrt0RteiYfB7yQYqddTmKJNm-s",
        authDomain: "sfeir-firebase.firebaseapp.com",
        databaseURL: "https://sfeir-firebase.firebaseio.com",
        projectId: "sfeir-firebase",
        storageBucket: "sfeir-firebase.appspot.com",
        messagingSenderId: "295388413389"
    }
};
