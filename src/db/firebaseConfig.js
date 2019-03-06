import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDEg6KepP-GTz7rtfDr4TmlGWTJJnPZk_I',
  authDomain: 'flashcards-5bcb1.firebaseapp.com',
  databaseURL: 'https://flashcards-5bcb1.firebaseio.com',
  projectId: 'flashcards-5bcb1',
  storageBucket: 'flashcards-5bcb1.appspot.com',
  messagingSenderId: '498617502369'
}
firebase.initializeApp(config)

// Utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// Collections
const usersCollection = db.collection('user')
const decksCollection = db.collection('decks')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  decksCollection
}
