import { initializeApp } from "firebase/app";
import {
  getAuth,
  OAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhk6vt5wexMpTeXG72O6IYPM8Zam4Lf7Y",
  authDomain: "authentication-3d4ce.firebaseapp.com",
  projectId: "authentication-3d4ce",
  storageBucket: "authentication-3d4ce.appspot.com",
  messagingSenderId: "730858604801",
  appId: "1:730858604801:web:d4f97a547cea889871b300",
  measurementId: "G-VPW2CKV2PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerForApple = new OAuthProvider("apple.com");
const providerForFacebook = new FacebookAuthProvider();
const providerForGithub = new GithubAuthProvider();
const providerForGoogle = new GoogleAuthProvider();
export {
  auth,
  providerForApple,
  providerForFacebook,
  providerForGithub,
  providerForGoogle,
};
