import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCRFTj7V-k7CaHr9qHMXmCJpIvZMOJHURQ",
  authDomain: "crwn-clothing-7865c.firebaseapp.com",
  databaseURL: "https://crwn-clothing-7865c-default-rtdb.firebaseio.com",
  projectId: "crwn-clothing-7865c",
  storageBucket: "crwn-clothing-7865c.appspot.com",
  messagingSenderId: "340303117730",
  appId: "1:340303117730:web:82e3a8a599f02d84c446fb",
  measurementId: "G-D6CDX31Y6G"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
