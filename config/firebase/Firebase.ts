import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBOx1F2wbDClyGjk-4XCMTEg0l5YGLGMQ8',

  authDomain: 'adssite-13adc.firebaseapp.com',

  projectId: 'adssite-13adc',

  storageBucket: 'adssite-13adc.appspot.com',

  messagingSenderId: '488772165659',

  appId: '1:488772165659:web:b1a357899d459f048018be',

  measurementId: 'G-1492EC6FHL',
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
