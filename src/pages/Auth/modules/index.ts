import { AuthProvider, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '../../../config/firebase';


export const SignInWithSocialMedia = (provider: AuthProvider) => {
    return new Promise<UserCredential>((resolve,reject) => {
        signInWithPopup(auth, provider).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err)
        })
    });
}



