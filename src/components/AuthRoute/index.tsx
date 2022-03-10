import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import Logging from '../../config/Loggings'

export interface IAuthRouteProps {

}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props

    if(!auth.currentUser){
        Logging.warn('No user detected, redirecting');
        return <Navigate to="/login"/>;
    }

    return (
        <>{children}</>
    )
}

export default AuthRoute