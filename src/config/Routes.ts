import IRoute from "../interfaces/Routes";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import HomePage from "../pages/Home";

const routes: IRoute[] = [
    {
        path: '/',
        element: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        element: Register,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        element: Login,
        name: 'Login Page',
        protected: false
    }
];

export default routes;