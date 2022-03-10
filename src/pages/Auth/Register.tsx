import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../config/firebase';
import Logging from '../../config/Loggings';

const Register: React.FunctionComponent = props => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    const signUpWithEmailAndPassword = () => {
        if(error!== '') setError('');
        if(password!==confirm) setError('Please make sure your password match.');
        setRegistering(true);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            Logging.info(userCredential);
            history('/login');
        }).catch((err: any)=> {
            Logging.error(err);
            if(err.code.includes('auth/weak-password')){
                setError('Please enter a stronger password.');
            }else if(err.code.includes('auth/email-already-in-use')){
                setError('Email is already in use');
            }else{
                setError('Unable to register. Please try again later.');
            }
            setRegistering(false);
        })
    }

    return (
        <>
            <form>
                <input type="email" name='email' id='email' placeholder='Email address' onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" name='password' id='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} autoComplete="new-password" />
                <input type="password" name='confirm' id='confirm' placeholder='Password confirm' onChange={e=>setConfirm(e.target.value)} value={confirm} autoComplete="new-password"/>
                <button disabled={registering} type='submit' onClick={e => {e.preventDefault(); signUpWithEmailAndPassword()} }>
                    Sign up
                </button>
            </form>
        </>
    );
}

export default Register;