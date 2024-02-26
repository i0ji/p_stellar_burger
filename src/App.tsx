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

import {Auth, UnAuth} from "components/common/ProtectedRoute/ProtectedRoute.tsx"

import Modal from "components/common/Modal/Modal.tsx";

import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";

import {fetchIngredients} from "slices/ingredientsSlice.ts";


export default function App() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state as { background?: Location };

    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    const handleCloseModal = useCallback(() => {
        navigate(-1);
    }, [navigate]);


    return (
        <>
            <AppHeader/>
            <Routes location={state?.background || location}>

                <Route path="/" element={<HomePage/>}/>

                <Route path="/login" element={<UnAuth component={<LoginPage/>}/>}/>
                <Route path="/register" element={<UnAuth component={<RegisterPage/>}/>}/>
                <Route path="/forgot-password" element={<UnAuth component={<ForgotPage/>}/>}/>
                <Route path="/reset-password" element={<Auth component={<ResetPage/>}/>}/>
                <Route path="/profile" element={<Auth component={<ProfilePage/>}/>}/>

                {/*<Route path="/login" element={<LoginPage/>}/>*/}
                {/*<Route path="/register" element={<RegisterPage/>}/>*/}
                {/*<Route path="/forgot-password" element={<ForgotPage/>}/>*/}
                {/*<Route path="/reset-password" element={<ResetPage/>}/>*/}
                {/*<Route path="/profile" element={<ProfilePage/>}/>*/}
                <Route path="/ingredient/:id" element={<IngredientDetails/>}/>
                <Route path="*" element={<NotFound404/>}/>
                <Route path="/warning" element={<Warning/>}/>
                <Route path="/reset-success" element={<SuccessPage/>}/>
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