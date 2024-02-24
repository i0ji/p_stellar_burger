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
} from "./pages"

import Modal from "components/common/Modal/Modal.tsx";

import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";


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
        navigate(-1)
    }, [navigate]);


    return (
        <>
            <AppHeader/>
            <Routes location={state?.background || location}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/forgot-password" element={<ForgotPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/ingredient/:id" element={<IngredientDetails/>}/>
                <Route path="*" element={<NotFound404/>}/>
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