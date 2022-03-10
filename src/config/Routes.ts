import IRoute from "../interfaces/Routes";
import ChangePassword from "../pages/Auth/Change";
import ForgotPassword from "../pages/Auth/Forgot";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/Reset";
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
    },
    {
        path: '/password/change',
        element: ChangePassword,
        name: 'Change Password Page',
        protected: true
    },
    {
        path: '/password/forgot',
        element: ForgotPassword,
        name: 'Forgot Password Page',
        protected: false
    },
    {
        path: '/password/reset',
        element: ResetPassword,
        name: 'Reset Password Page',
        protected: false
    }
];

export default routes;