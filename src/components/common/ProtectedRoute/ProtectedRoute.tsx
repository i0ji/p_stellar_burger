import React from "react";

import {Loader} from "components/index.ts";

import {useSelector} from "hooks/reduxHooks.ts";
import {Navigate, useLocation} from "react-router-dom";

export function ProtectedRoute({
    unAuth = false,
    component,
}: {
    readonly unAuth: boolean;
    readonly component: React.ReactNode;
}) {
    const user = useSelector(state => state.authSlice.user),
        isAuthChecked = useSelector(state => state.authSlice.authChecked),
        location = useLocation();

    // --------------- LOADER ---------------

    if (!isAuthChecked) {
        return <Loader description="Проверяем документы..." />;
    }

    if (unAuth && user) {
        const {from} = location.state || {from: {pathname: "/"}};
        return from.pathname == "/profile" ? <Navigate to="/" /> : <Navigate to={from} />;
    }

    if (!unAuth && !user) {
        return <Navigate state={{from: location}} to="/login" />;
    }

    return component;
}
