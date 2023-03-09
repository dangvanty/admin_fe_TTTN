import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCAvE7hduRokn1UJACEAsrP-J-qzsdmemA',
  authDomain: 'totnghiep-d2829.firebaseapp.com',
  projectId: 'totnghiep-d2829',
  storageBucket: 'totnghiep-d2829.appspot.com',
  messagingSenderId: '435384782000',
  appId: '1:435384782000:web:abdd6fdc01f4a97cf4ff75',
  measurementId: 'G-B5CJJJYVKQ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
