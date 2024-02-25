import React from "react";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import Loader from "components/common/Loader/Loader.tsx";

function ProtectedRoute({unAuth = false, component}: { unAuth: boolean, component: React.ReactNode }) {

    const user = useSelector(state => state.user.user);
    const isAuthChecked = useSelector(state => state.user.isAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Loader/>;
    }

    if (!unAuth && !user) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    if (unAuth && user) {
        const {form} = location.state || {form: {pathname: '/'}};
        return <Navigate to={form}/>
    }

    return (
        component
    );
}

export const Auth = ProtectedRoute;
export const UnAuth = ({component}: { component: React.ReactNode }) => (
    <ProtectedRoute unAuth={true} component={component}/>
)

