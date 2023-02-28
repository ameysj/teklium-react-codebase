import Login from '../../Containers/Loginpage/index';
import Register from "../../Containers/Registerpage/index";
import Homepage from './../../Containers/Homepage/index';
import ForgotPassword from '../../Containers/ForgotPassword';
import ProfilePage from '../../Containers/AccountInfo';
import Subscription from '../../Containers/Subscription';

export const RoutesData=[
    {
        path: "/",
        name: "home",
        component: <Homepage />,
    },
    {
        path: "/login",
        name: "login",   
        component: <Login/>,
    },
    {
        path: "/register",
        name: "register",
        component: <Register/>,        
    },
    {
        path: "/forgotpassword",
        name: "forgotpassword",
        component: <ForgotPassword/>,        
    },
    {
        path: "/profilepage",
        name: "profilepage",
        component: <ProfilePage />,        
    },
    {
        path: "/subscription-plan",
        name: "subscription-plan",
        component: <Subscription />,        
    }
]