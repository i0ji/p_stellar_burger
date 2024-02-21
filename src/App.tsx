import {Routes, Route} from 'react-router-dom';

import AppHeader from "components/AppHeader/AppHeader.tsx";
import {
    LoginPage,
    HomePage,
    NotFound404,
    RegisterPage,
    ForgotPage,
    ProfilePage,
    IngredientDetailsPage
} from "./pages"

export default function App() {

    return (
        <>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/forgot-password" element={<ForgotPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="*" element={<NotFound404/>}/>
                <Route path="/:productID" element={<IngredientDetailsPage/>}/>
            </Routes>
            {/*<Routes>*/}
            {/*<Route path="/:productID" element={<IngredientDetailsPage/>}/>*/}
            {/*</Routes>*/}
        </>
    )
}