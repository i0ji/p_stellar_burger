import {Routes, Route, useNavigate} from 'react-router-dom';

import AppHeader from "components/AppHeader/AppHeader.tsx";

import {RootState} from "interfaces/rootState.ts";

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
    Warning,
    OrdersPage
} from "./pages";

import {ProtectedRoute} from "components/common/ProtectedRoute/ProtectedRoute.tsx"

import Modal from "components/common/Modal/Modal.tsx";
import Loader from "components/common/Loader/Loader.tsx";

import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";

import {fetchIngredients} from "slices/ingredientsSlice.ts";
import {checkUserAuth, getUserData} from "utils/api.ts";


export default function App() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state as { background?: Location };
    const userAuth = useSelector((state: RootState) => state.authSlice.isAuth);
    const userAuthChecked = useSelector((state: RootState) => state.authSlice.authChecked);
    const ingredientsStatus = useSelector((state: RootState) => state.ingredients.status);
    const accessToken = localStorage.getItem('accessToken');

    console.log('ingredients loading status:', ingredientsStatus);

    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(checkUserAuth());
        dispatch(getUserData());
    }, [dispatch, accessToken]);

    console.log(`Refresh token:`, localStorage.getItem('refreshToken'));
    console.log('Access Token:', localStorage.getItem('accessToken'));
    console.log(`User Auth: ${userAuth}`);
    console.log(`Auth is checked: ${userAuthChecked}`);


    const handleCloseModal = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    if (ingredientsStatus == 'loading') {
        return <Loader/>;
    }

    return (
        <>
            <AppHeader/>

            <Routes location={state?.background || location}>

                <Route path="/" element={<HomePage/>}/>
                <Route path="/ingredient/:id" element={<IngredientDetails/>}/>
                <Route path="*" element={<NotFound404/>}/>
                <Route path="/warning" element={<Warning/>}/>
                <Route path="/reset-password" element={<ResetPage/>}/>
                <Route path="/reset-success" element={<SuccessPage/>}/>

                <Route path="/profile" element={<ProtectedRoute unAuth={false} component={<ProfilePage/>}/>}/>
                <Route path="/orders" element={<ProtectedRoute unAuth={false} component={<OrdersPage/>}/>}/>

                <Route path="/reset-success" element={<ProtectedRoute unAuth={true} component={<SuccessPage/>}/>}/>
                <Route path="/login" element={<ProtectedRoute unAuth={true} component={<LoginPage/>}/>}/>
                <Route path="/register" element={<ProtectedRoute unAuth={true} component={<RegisterPage/>}/>}/>
                <Route path="/forgot-password" element={<ProtectedRoute unAuth={true} component={<ForgotPage/>}/>}/>

            </Routes>

            {state?.background && (
                <Routes>
                    <Route path="/ingredient/:id" element={
                        <Modal
                            onClose={handleCloseModal}
                        >
                            <IngredientDetails/>
                        </Modal>
                    }/>
                </Routes>
            )}
        </>
    )
}