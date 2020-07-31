import * as firebase from "firebase/app";
import "firebase/auth";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyALpQ8hu1OrvHQaBLHNBoNoT0gJpciJYtY",
  authDomain: "foodapp-e6ee9.firebaseapp.com",
  databaseURL: "https://foodapp-e6ee9.firebaseio.com",
  projectId: "foodapp-e6ee9",
  storageBucket: "foodapp-e6ee9.appspot.com",
  messagingSenderId: "886068241224",
  appId: "1:886068241224:web:c4e72b0061e9c56fe9c97d",
};
firebase.initializeApp(firebaseConfig);

// utils
const auth = firebase.auth();

// export utils/refs
export { auth, firebase };
