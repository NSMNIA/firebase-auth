import React, { useEffect, useState } from 'react';
import { RouteProps, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Logging from '../../config/Loggings';
import { auth, verifyPasswordResetCode, confirmPasswordReset } from '../../config/firebase';

const ResetPassword: React.FunctionComponent<RouteProps> = props => {
    let location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams(location.search);

    const [verifying, setVerifying] = useState<boolean>(true);
    const [verified, setVerified] = useState<boolean>(false);
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [oobCode, setOobCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    useEffect(()=> {
        Logging.info('Extracting info');
        if(searchParams){
            let oobCode = searchParams.get('oobCode') as string;
            if(oobCode) {
                Logging.info('Code found');
                verifyPasswordResetLink(oobCode);
            } else{
                Logging.error("Unable to find code.");
                setVerified(false);
                setVerifying(false);
            }
        }else{
            Logging.error("Unable to find code.");
            setVerified(false);
            setVerifying(false);
        }
    }, [])

    const verifyPasswordResetLink = (_oobCode: string) => {
        verifyPasswordResetCode(auth, _oobCode).then(result => {
            Logging.info(result);
            setOobCode(_oobCode);
            setVerified(true);
            setVerifying(false);
        }).catch(err => {
            Logging.error(err);
            setVerified(false);
            setVerifying(false);
        })
    }

    const passwordResetRequest = () => {
        if(password !== confirm){
            setError('Make sure your passwords are matching.');
            return;
        }

        if(error !== '') setError('');

        setChanging(true);
        confirmPasswordReset(auth, oobCode, password).then(result => {
            Logging.info(result);
            history('/login');
        }).catch(err => {
            Logging.error(err);
            setError(err.message);
            setChanging(false);
        })
    }

    return (
        <>
        {verifying ?
        'Verifying...' :
            verified ?
            <form>
                <input type="password" autoComplete='new-password' name='newPassword' id='newPassword' placeholder='Enter password' onChange={e => setPassword(e.target.value)} value={password} />
                <input type="password" autoComplete='new-password' name='confirmPassword' id='confirmPassword' placeholder='Confirm password' onChange={e => setConfirm(e.target.value)} value={confirm} />
                <button disabled={changing} onClick={e => { e.preventDefault(); passwordResetRequest() }}>
                    Change password
                </button>
            </form>
            : <p>Invalid link</p>
        }
        </>
    );
}

export default ResetPassword;