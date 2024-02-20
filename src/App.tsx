import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppHeader from "components/AppHeader/AppHeader.tsx";
import {
	LoginPage,
	BurgerBuilder,
	NotFound404,
	RegisterPage,
	ForgotPage,
	ProfilePage,
	IngredientDetailsPage
} from "./pages"

export default function App() {
	
	return (
		<>
			<BrowserRouter>
				<AppHeader/>
				<Routes>
					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/forgot-password" element={<ForgotPage/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
					<Route path="/profile" element={<ProfilePage/>}/>
					<Route path="/" element={<BurgerBuilder/>}>
						<Route path="/ingredient/:productID" element={<IngredientDetailsPage/>}/>
					</Route>
					<Route path="*" element={<NotFound404/>}/>
				
				</Routes>
			</BrowserRouter>
		
		</>
	)
}