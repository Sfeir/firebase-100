
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
    // @todo
    // apiKey: '',
    // authDomain: '',
    // databaseURL: '',
    // projectId: '',
    // storageBucket: '',
    // messagingSenderId: ''
  }
};
