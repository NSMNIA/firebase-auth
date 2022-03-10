import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../config/firebase';
import Logging from '../../config/Loggings';

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
            setAuthenticating(false);
            setError('Unable to sign in. Please try again later.')
        })
    }

    return (
        <>
            <form>
                <input type="email" name='email' value={email} placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                <input type="password" name='password' value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button disabled={authenticating} onClick={e=>{e.preventDefault(); signIn()}}>Log in</button>
            </form>
        </>
    );
}

export default Login;