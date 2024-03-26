import {Routes, Route} from 'react-router-dom';
import {ProtectedRoute} from "common/ProtectedRoute/ProtectedRoute.tsx"
import {checkUserAuth, getUserData, getIngredients} from "utils/api.ts";

import {RootState} from "declarations/rootState.ts";

import AppHeader from "components/AppHeader/AppHeader.tsx";
import Loader from "common/Loader/Loader.tsx";
import {
    LoginPage,
    HomePage,
    NotFound404,
    RegisterPage,
    ForgotPage,
    ProfilePage,
    IngredientDetails,
    ResetPage,
    SuccessPage,
    FeedPage,
    OrderDetails,
    HistoryPage
} from "./pages";


import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";


// import {WS_URL} from "declarations/routs.ts";


export default function App() {

    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state as { background?: Location };

    const ingredientsStatus = useSelector((state: RootState) => state.ingredients.status);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
        dispatch(getUserData());
    }, [dispatch, accessToken]);

    console.log('v:0.1.9.6.3');
    // console.log('ingredients loading status:', ingredientsStatus);
    // console.log(`Refresh token:`, localStorage.getItem('refreshToken'));
    // console.log('Access Token:', localStorage.getItem('accessToken'));
    // console.log(`User Auth: ${userAuth}`);
    // console.log(`Auth is checked: ${userAuthChecked}`);


    // const ws = new WebSocket(`${WS_URL}orders`);
    //
    // console.log(`WS:${ws.readyState}`);
    //
    // ws.send('hello');
    //
    // ws.onmessage = (event) => {
    //     console.log(`Получены данныe: ${event.data}`)
    // }


    if (ingredientsStatus == 'loading') {
        return <Loader/>;
    }

    return (
        <>
            <AppHeader/>

            <Routes location={state?.background || location}>

                <Route path="" element={<HomePage/>}/>
                <Route path="ingredient/:id" element={<IngredientDetails/>}/>
                <Route path="*" element={<NotFound404/>}/>


                <Route path="reset-password" element={<ResetPage/>}/>
                <Route path="reset-success" element={<SuccessPage/>}/>


                {/*SPRINT 5 NEW ROUTES*/}
                <Route path="feed" element={<FeedPage/>}/>
                <Route path="feed/:number" element={<OrderDetails/>}/>
                {/*<Route path="profile/history" element={<ProfilePage>}/>*/}
                <Route path="profile/orders/:number" element={<OrderDetails/>}/>
                {/*SPRINT 5 NEW ROUTES*/}


                <Route path="profile" element={<ProtectedRoute unAuth={false} component={<ProfilePage/>}/>}>
                    <Route path="history" element={<HistoryPage/>}/>
                </Route>

                <Route path="login" element={<ProtectedRoute unAuth={true} component={<LoginPage/>}/>}/>
                <Route path="reset-success" element={<ProtectedRoute unAuth={true} component={<SuccessPage/>}/>}/>
                <Route path="login" element={<ProtectedRoute unAuth={true} component={<LoginPage/>}/>}/>
                <Route path="register" element={<ProtectedRoute unAuth={true} component={<RegisterPage/>}/>}/>
                <Route path="forgot-password" element={<ProtectedRoute unAuth={true} component={<ForgotPage/>}/>}/>

            </Routes>

            {
                state?.background && (
                    <Routes>
                        <Route path="/ingredient/:id" element={
                            <IngredientDetails/>
                        }/>
                    </Routes>
                )
            }
        </>
    )
}