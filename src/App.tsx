import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
import routes from './config/Routes';
import AuthRoute from './components/AuthRoute';
import { auth, onAuthStateChanged } from './config/firebase';
import Logging from './config/Loggings';

const App: React.FunctionComponent = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user)
            {
                Logging.info('User detected');
            }else{
                Logging.info('No user detected');
            }
            setLoading(false);
        })
    }, [])

    if(loading)
        return <div>Laden..</div>;

    return (
        <>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        if (route.protected)
                            return <Route key={index}
                                path={route.path}
                                element={<AuthRoute><route.element /></AuthRoute>} />

                        return <Route key={index}
                            path={route.path}
                            element={<route.element />}
                        />
                    }
                    )}
                </Routes>
            </Router>
        </>
    )
}

export default App