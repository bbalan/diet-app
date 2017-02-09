import Vue from 'vue'
import Firebase from 'firebase'
import VueFire from 'vuefire'
import firebaseDB from './util/Firebase'

Vue.use(VueFire)

const config = {
  apiKey: 'AIzaSyDczUA_Qm5wt1sPd4-Q-wjFC95h3OkmhRM',
  authDomain: 'diet-app-dev.firebaseapp.com',
  databaseURL: 'https://diet-app-dev.firebaseio.com',
  storageBucket: 'diet-app-dev.appspot.com',
  messagingSenderId: '95744602886',
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export default db

// firebaseApp
//   .database()
//   .ref('test')
//   .once('value')
//   .then((snapshot) => {
//     console.log('##########', snapshot.val())
//   })
