// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '9000',
    endpoints: {
      allPeople: '/',
      reset: '/reset',
      onePeople: '/:id',
      randomPeople: '/random'
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
