import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyChPccnzKqDcrVWQ6zb8IWPY8anhfZgz0E",
    authDomain: "messenger-clone-acf8d.firebaseapp.com",
    projectId: "messenger-clone-acf8d",
    storageBucket: "messenger-clone-acf8d.appspot.com",
    messagingSenderId: "846866857519",
    appId: "1:846866857519:web:9d0bc9c32399d691f210da",
    measurementId: "G-G8C966M04J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };