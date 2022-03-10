import { AuthProvider } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth, signInWithEmailAndPassword, Providers, onAuthStateChanged } from '../../config/firebase';
import Logging from '../../config/Loggings';
import { SignInWithSocialMedia } from './modules';

const Login: React.FunctionComponent = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');

    const history = useNavigate();

    const signIn = () => {
        if(error!=='') setError('')
        setAuthenticating(true);
        signInWithEmailAndPassword(auth, email, password).then(result => {
            Logging.info(result);
            history('/');
        }).catch(err => {
            Logging.error(err);
            if(err.code.includes('auth/invalid-email')){
                setError('Invalid email.')
            } else if (err.code.includes('auth/wrong-password')){
                setError('Invalid password.');
            } else if (err.code.includes('auth/user-not-found')){
                setError('Email does not exist in our database.');
            } else{
                setError('Unable to sign in. Please try again later.')
            }
            setAuthenticating(false);
        })
    }

    const signInWithSocialMedia = (provider: AuthProvider) => {
        if(error !== '') setError('');

        setAuthenticating(true);

        SignInWithSocialMedia(provider).then(result => {
            Logging.info(result);
            history('/');
        }).catch(err => {
            Logging.error(err);
            setAuthenticating(false);
            setError('Unable to sign in. Please try again later.')
        })
    }

    useEffect(()=> {
        onAuthStateChanged(auth, user => {
            if (user) return history('/');
        })
    }, []);

    return (
        <>
            <form>
                <input type="email" name='email' value={email} placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                <input type="password" name='password' value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button disabled={authenticating} onClick={e=>{e.preventDefault(); signIn()}}>Log in</button>

                <button disabled={authenticating} onClick={e=>{e.preventDefault(); signInWithSocialMedia(Providers.google)}}>
                    Login via Google
                </button>

                <ErrorText error={error}/>
            </form>
        </>
    );
}

export default Login;