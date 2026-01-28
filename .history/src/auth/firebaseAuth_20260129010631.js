import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const firebaseAuth = {
  login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout() {
    return signOut(auth);
  },

  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  getUser() {
    return auth.currentUser;
  },
};
