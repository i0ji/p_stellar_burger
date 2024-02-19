import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppHeader from "components/AppHeader/AppHeader.tsx";
import {LoginPage, BurgerBuilder, NotFound404} from "./pages"

export default function App() {
	
	return (
		<BrowserRouter>
			<AppHeader/>
			<Routes>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/constructor" element={<BurgerBuilder/>}/>
				<Route path="*" element={<NotFound404/>}/>
			</Routes>
		</BrowserRouter>
	)
}