import "styles/_scrollbar.scss"

import {Routes, Route, useNavigate} from 'react-router-dom';
import {ProtectedRoute} from "common/ProtectedRoute/ProtectedRoute.tsx"
import {checkUserAuth, getUserData, getIngredients} from "utils/api.ts";

import {RootState} from "declarations/rootState.ts";

import AppHeader from "components/AppHeader/AppHeader.tsx";
import Loader from "common/Loader/Loader.tsx";
import Modal from "common/Modal/Modal.tsx";
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
    ProfileOrders
} from "./pages";

import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";

export default function App() {


    // --------------- VARS/STATES ---------------

    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state as { background?: Location };
    const navigate = useNavigate();
    const ingredientsStatus = useSelector((state: RootState) => state.ingredients.status);
    const accessToken = localStorage.getItem('accessToken');
    const handleCloseModal = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
        dispatch(getUserData());
    }, [dispatch, accessToken]);

    console.log('v:0.1.9.6.6');


    // --------------- LOADER ---------------

    if (ingredientsStatus == 'loading') {
        return <Loader/>;
    }

    return (
        <>
            <AppHeader/>

            <Routes location={state?.background || location}>

                <Route path="/" element={<HomePage/>}/>
                <Route path="reset-password" element={<ResetPage/>}/>
                <Route path="reset-success" element={<SuccessPage/>}/>
                <Route path="ingredient/:id" element={<IngredientDetails/>}/>

                {/*SPRINT 5 NEW ROUTES*/}
                {/*<Route path="feed" element={<FeedPage/>}>*/}
                {/*    <Route path=":number" element={<OrderDetails/>}/>*/}
                {/*</Route>*/}
                <Route path="feed" element={<FeedPage/>}/>
                    <Route path="feed/:number" element={<OrderDetails/>}/>




                <Route path="profile" element={<ProtectedRoute unAuth={false} component={<ProfilePage/>}/>}>
                    <Route path="orders" element={<ProtectedRoute unAuth={false} component={<ProfileOrders/>}/>}>
                        <Route path=":number" element={<ProtectedRoute unAuth={false} component={<OrderDetails/>}/>}/>
                    </Route>
                </Route>
                {/*SPRINT 5 NEW ROUTES*/}

                <Route path="login" element={<ProtectedRoute unAuth={true} component={<LoginPage/>}/>}/>
                <Route path="register" element={<ProtectedRoute unAuth={true} component={<RegisterPage/>}/>}/>
                <Route path="forgot-password" element={<ProtectedRoute unAuth={true} component={<ForgotPage/>}/>}/>


                <Route path="*" element={<NotFound404/>}/>
            </Routes>

            {
                state?.background && (
                    <Routes>
                        <Route path="ingredient/:id" element={
                            <Modal onClose={handleCloseModal}>
                                <IngredientDetails/>
                            </Modal>
                        }/>
                    </Routes>
                )
            }
            {
                state?.background && (
                    <Routes>
                        <Route path="/feed/:number" element={
                            <Modal onClose={handleCloseModal}>
                                <OrderDetails/>
                            </Modal>
                        }/>
                    </Routes>
                )
            }
        </>
    )
}