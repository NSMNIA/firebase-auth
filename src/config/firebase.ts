import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/firestore';
import Config from './Config'

const app = initializeApp(Config.firebase);

// export const Providers: {} = {
//   google: new firebase.auth.GoogleAuthProvider()
// }

export const auth = getAuth();
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
export default app;