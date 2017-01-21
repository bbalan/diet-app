// Initialize Firebase
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDczUA_Qm5wt1sPd4-Q-wjFC95h3OkmhRM',
  authDomain: 'diet-app-dev.firebaseapp.com',
  databaseURL: 'https://diet-app-dev.firebaseio.com',
  storageBucket: 'diet-app-dev.appspot.com',
  messagingSenderId: '95744602886',
};

const firebaseApp = firebase.initializeApp(config);

// console.log(firebaseApp);
// console.log(firebaseApp.database());

// firebaseApp
//   .database()
//   .ref('test')
//   .once('value')
//   .then((snapshot) => {
//     console.log('##########', snapshot.val());
//   });
const db = firebaseApp.database();

export default db;
// export default firebaseApp;
