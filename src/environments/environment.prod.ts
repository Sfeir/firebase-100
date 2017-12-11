
export const environment = {
  production: true,
  backend: {
    protocol: 'https',
    host: 'us-central1-sfeir-firebase.cloudfunctions.net',
    port: '443',
    endpoints: {
      allPeople: '/people/',
      reset: '/reset',
      onePeople: '/people/:id',
      randomPeople: '/people/random'
    }
  },
  firebase: {
    apiKey: 'AIzaSyClJyRZYlrt0RteiYfB7yQYqddTmKJNm-s',
    authDomain: 'sfeir-firebase.firebaseapp.com',
    databaseURL: 'https://sfeir-firebase.firebaseio.com',
    projectId: 'sfeir-firebase',
    storageBucket: 'sfeir-firebase.appspot.com',
    messagingSenderId: '295388413389'
  }
};
