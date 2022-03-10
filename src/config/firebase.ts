import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';
import Config from './Config'

const app = initializeApp(Config.firebase);

export const Providers: any = {
  google: new GoogleAuthProvider()
}

export const auth = getAuth();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  onAuthStateChanged,
  signOut
};
export default app;