import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDYexeb3IlQrJDP07F9JfArIrxCcEYJUNI',
  authDomain: 'team-admin.firebaseapp.com',
  databaseURL: 'https://team-admin.firebaseio.com',
  projectId: 'team-admin',
  storageBucket: 'team-admin.appspot.com',
  messagingSenderId: '787016448448'
}
firebase.initializeApp(config)

// Utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// Collections
const usersCollection = db.collection('Users')
const decksCollection = db.collection('Decks')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  decksCollection
}
