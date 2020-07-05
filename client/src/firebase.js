import * as app from 'firebase/app';
import 'firebase/storage';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBHqKNWRFrFduP_Pq5LZ_NEdnho082LKV0',
  authDomain: 'dev-connector-72827.firebaseapp.com',
  databaseURL: 'https://dev-connector-72827.firebaseio.com',
  projectId: 'dev-connector-72827',
  storageBucket: 'dev-connector-72827.appspot.com',
  messagingSenderId: '65677026655',
  appId: '1:65677026655:web:c95d14c966363cc59d82ea',
  measurementId: 'G-2LK0MFJ0X3',
};
// Initialize Firebase
export const firebase = app.initializeApp(firebaseConfig);
