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

import {useLocation} from "react-router-dom";

export default function App() {
	
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	
	return (
		<>
			<AppHeader/>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/forgot-password" element={<ForgotPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/profile" element={<ProfilePage/>}/>
				<Route path="*" element={<NotFound404/>}/>
			</Routes>
			
			{state?.backgroundLocation && (
				<Routes>
					<Route path="/ingredient/:id" element={<IngredientDetailsPage/>}/>
				</Routes>
			)}
		</>
	)
}