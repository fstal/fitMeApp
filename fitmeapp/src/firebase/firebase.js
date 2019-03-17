import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDrAlnnRoI9PjBsmnQRFehYQUepbxUe05k",
  authDomain: "fitmeup-eeeb9.firebaseapp.com",
  databaseURL: "https://fitmeup-eeeb9.firebaseio.com",
  projectId: "fitmeup-eeeb9",
  storageBucket: "fitmeup-eeeb9.appspot.com",
  messagingSenderId: "736729880854",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const database = firebase.database();

/*
database.ref().set({
      username: "chips"
    });
*/

const auth = firebase.auth();

export {
  auth,
  database
};