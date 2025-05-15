import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCo8SSSUa8bey0J8Nm3Tun-RQqIzTjHZSk',
  authDomain: 'aquaballance-1b2ae.firebaseapp.com',
  projectId: 'aquaballance-1b2ae',
  storageBucket: 'aquaballance-1b2ae.appspot.com',
  messagingSenderId: '1064402930503',
  appId: '1:1064402930503:web:829a0f49566dc3ec711a62',
  measurementId: 'G-46WWR71QHN'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);