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
				<Route path="/ingredient/:productID" element={<IngredientDetailsPage/>}/>
				<Route path="*" element={<NotFound404/>}/>
			</Routes>
		</>
	)
}