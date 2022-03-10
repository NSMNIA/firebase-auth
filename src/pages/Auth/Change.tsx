import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth, updatePassword } from '../../config/firebase';
import Logging from '../../config/Loggings';

const ChangePassword: React.FunctionComponent = props => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [old, setOld] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    const passwordChangeRequest = () => {
        if(error !== '') setError('');
        if(password === '' || confirm === '' || old === '') {
            setError('Password can not be empty');
            return;
        }
        if(password !== confirm) {
            setError('Make sure your passwords are matching');
            return;
        }

        setChanging(true);

        const user: any = auth.currentUser;
        updatePassword(user, password).then(result => {
            Logging.info('Password changed successful.');
            history('/');
        }).catch(err => {
            Logging.error(err);
            setChanging(false);
            if(err.code.includes('auth/weak-password')){
                setError('Password should be at least 6 characters.')
            } else {
                setError('Unable to change password. Please try again later.')
            }
        })
    }

    // Only allow email and password to change the password
    if(auth.currentUser?.providerData[0]?.providerId !== 'password'){
        return <Navigate to="/"/>
    }

    return (
        <>
            <form>
                <input type="password" autoComplete='new-password' name='oldPassword' id='oldPassword' placeholder='Current password' onChange={e => setOld(e.target.value)} value={old} />
                <input type="password" autoComplete='new-password' name='newPassword' id='newPassword' placeholder='Enter password' onChange={e => setPassword(e.target.value)} value={password} />
                <input type="password" autoComplete='new-password' name='confirmPassword' id='confirmPassword' placeholder='Confirm password' onChange={e => setConfirm(e.target.value)} value={confirm}/>

                <button disabled={changing} onClick={e=> {e.preventDefault(); passwordChangeRequest()}}>
                    Change password
                </button>
                <ErrorText error={error}/>
            </form>
        </>
    );
}

export default ChangePassword;