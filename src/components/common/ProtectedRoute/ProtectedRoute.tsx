import React from "react";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import Loader from "components/common/Loader/Loader.tsx";


export const ProtectedRoute = ({unAuth = false, component}: { unAuth: boolean, component: React.ReactNode }) => {
    const user = useSelector((state) => state.authSlice.user);
    const isAuthChecked = useSelector((state) => state.authSlice.authChecked)
    const location = useLocation();

    if (!isAuthChecked) {
        return <Loader/>
    }

    if (unAuth && user) {
        const {from} = location.state || {from: {pathname: '/'}};
        return (from.pathname == '/profile') ? <Navigate to="/"/> : <Navigate to={from}/>
    }

    if (!unAuth && !user) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return component;
};