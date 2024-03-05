import {Routes, Route, useNavigate} from 'react-router-dom';

import AppHeader from "components/AppHeader/AppHeader.tsx";

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
    Warning
} from "./pages";

import {ProtectedRoute} from "components/common/ProtectedRoute/ProtectedRoute.tsx"

import Modal from "components/common/Modal/Modal.tsx";
import Loader from "components/common/Loader/Loader.tsx";

import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";

import {fetchIngredients} from "slices/ingredientsSlice.ts";
import {checkUserAuth} from "utils/api.ts";


export default function App() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state as { background?: Location };
    const userAuth = useSelector(state => state.authSlice.isAuth);
    const userAuthChecked = useSelector(state => state.authSlice.authChecked);
    const ingredientsStatus = useSelector(state => state.ingredients.status);

    console.log('ingredients loading status:',ingredientsStatus);

    useEffect(() => {
        dispatch(fetchIngredients());
        dispatch(checkUserAuth());
    }, []);


    console.log(`refresh:`, localStorage.getItem('refreshToken'));
    console.log('access:', localStorage.getItem('accessToken'));
    console.log(`userAuth: ${userAuth}`);
    console.log(`isChecked: ${userAuthChecked}`);


    const handleCloseModal = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    if (ingredientsStatus == 'loading') {
        return <Loader/>
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