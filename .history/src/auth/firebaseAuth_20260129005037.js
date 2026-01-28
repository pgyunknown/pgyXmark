import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseAuth = {
  login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout() {
    return signOut(auth);
  },

  onAuthChange(cb) {
    return onAuthStateChanged(auth, cb);
  },

  getUser() {
    return auth.currentUser;
  },
};
