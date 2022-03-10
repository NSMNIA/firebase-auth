import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../../config/firebase';
import Logging from '../../config/Loggings';

const Logout: React.FunctionComponent = props => {
    const history = useNavigate();
    const logOut = () => {
        signOut(auth).then(()=>history('/login')).catch(err=>Logging.error(err))
    }
    return (
        <>
            <button onClick={()=>logOut()}>Log Out</button>
        </>
    );
}

export default Logout;