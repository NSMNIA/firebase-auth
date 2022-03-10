import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const HomePage: React.FunctionComponent = props => {
    return (
        <>
        Hallo

            <Logout/>
        </>
    );
}

export default HomePage;