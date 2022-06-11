// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD0geRNvlKYIWrvEjDo5UpaHKiQMCdVLQo",
  authDomain: "covid-tracker-e1a40.firebaseapp.com",
  databaseURL: "https://covid-tracker-e1a40.firebaseio.com",
  projectId: "covid-tracker-e1a40",
  storageBucket: "covid-tracker-e1a40.appspot.com",
  messagingSenderId: "378640015645",
  appId: "1:378640015645:web:ac1e14af2de8558e28c1f4",
  measurementId: "G-4RVCMV2KY1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
