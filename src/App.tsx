import "styles/_scrollbar.scss"
import {AnimatePresence} from "framer-motion";

import {Routes, Route, useNavigate} from 'react-router-dom';
import {ProtectedRoute} from "common/ProtectedRoute/ProtectedRoute.tsx"
import {checkUserAuth, getUserData, getIngredients} from "utils/api.ts";

import {
    AppHeader,
    Loader,
    Modal,
} from "components/index.ts"
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
    ProfileOrders,
} from "./pages";

import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect} from "react";


export default function App() {


    // --------------- VARS & STATES ---------------

    const dispatch = useDispatch(),
        location = useLocation(),
        background: string = location.state && location.state.background,
        navigate = useNavigate(),
        ingredientsStatus = useSelector(state => state.ingredients.status),
        accessToken = localStorage.getItem('accessToken'),
        // --------------- HANDLE CLOSE MODAL
        handleCloseModal = useCallback(() => {
            navigate(-1);
        }, [navigate]);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth());
        dispatch(getUserData());
    }, [dispatch, accessToken]);

    // --------------- LOADER ---------------

    if (ingredientsStatus == 'loading') {
        return <Loader description={'Загрузка...'}/>;
    }


    // --------------- MARKUP ---------------

    return (
        <>
            <AppHeader/>

            <AnimatePresence>
                <Routes location={background || location}>

                    <Route path="/" element={<HomePage/>}/>
                    <Route path="reset-password" element={<ResetPage/>}/>
                    <Route path="reset-success" element={<SuccessPage/>}/>
                    <Route path="ingredient/:id" element={<IngredientDetails/>}/>

                    <Route path="feed" element={<FeedPage/>}/>
                    <Route path="feed/:number" element={<OrderDetails/>}/>

                    <Route
                        path="profile"
                        element={<ProtectedRoute unAuth={false} component={<ProfilePage/>}/>}
                    />

                    <Route
                        path="profile/orders"
                        element={<ProtectedRoute unAuth={false} component={<ProfileOrders/>}/>}
                    />

                    <Route
                        path="profile/orders/:number"
                        element={<ProtectedRoute unAuth={false} component={<OrderDetails/>}/>}
                    />


                    <Route path="login" element={<ProtectedRoute unAuth={true} component={<LoginPage/>}/>}/>
                    <Route path="register" element={<ProtectedRoute unAuth={true} component={<RegisterPage/>}/>}/>
                    <Route path="forgot-password" element={<ProtectedRoute unAuth={true} component={<ForgotPage/>}/>}/>

                    <Route path="*" element={<NotFound404/>}/>
                </Routes>
            </AnimatePresence>

            {
                background && (
                    <Routes>
                        <Route path="ingredient/:id"
                               element={
                                   <Modal onClose={handleCloseModal}>
                                       <IngredientDetails/>
                                   </Modal>
                               }
                        />
                    </Routes>
                )
            }

            {
                background && (
                    <Routes>
                        <Route path="feed/:number"
                               element={
                                   <Modal onClose={handleCloseModal}>
                                       <OrderDetails/>
                                   </Modal>
                               }
                        />
                    </Routes>
                )
            }
            {
                background && (
                    <Routes>
                        <Route path="profile/orders/:number"
                               element={
                                   <Modal onClose={handleCloseModal}>
                                       <OrderDetails/>
                                   </Modal>
                               }
                        />
                    </Routes>
                )
            }
        </>
    )
}