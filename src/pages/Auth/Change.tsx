import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, updatePassword } from '../../config/firebase';

const ChangePassword: React.FunctionComponent = props => {
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [old, setOld] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    const passwordChangeRequest = () => {
        if(error !== '') setError('');

        // updatePassword(auth.currentUser, password)
    }

    return (
        <p>Change password page.</p>
    );
}

export default ChangePassword;