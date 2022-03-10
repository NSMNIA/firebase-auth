import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth, sendPasswordResetEmail, onAuthStateChanged } from '../../config/firebase';
import Logging from '../../config/Loggings';

const ForgotPassword: React.FunctionComponent = props => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    const resetPasswordRequest = () => {
        if(error !== '') setError('');
        if(email === '') return setError('Email can not be empty.')
        setSending(true);
        sendPasswordResetEmail(auth, email).then(result => {
            Logging.info("Email sent.");
            setSent(true);
            setSending(false);
        }).catch(err=>{
            Logging.error(err);
            if (err.code.includes('auth/user-not-found')){
                setError('User is not found.');
            } else if (err.code.includes('auth/invalid-email')){
                setError('Email is not valid.')
            }else{
                setError(err.message);
            }
            setSending(false);
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) return history('/');
        })
    }, []);

    return (
        <>
            {
                sent ? <p>A link has been sent to your email with instructions</p>
                : <form>
                    <p>Please enter your email</p>
                    <input type="email" name='email' id='email' placeholder='Enter email' onChange={e => setEmail(e.target.value)} value={email} />
                    <button disabled={sending} onClick={e => {e.preventDefault(); resetPasswordRequest()}}>
                        Send reset link
                    </button>
                    <ErrorText error={error}/>
                </form>
            }
        </>
    );
}

export default ForgotPassword;