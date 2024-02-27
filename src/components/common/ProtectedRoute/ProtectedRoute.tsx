import {useSelector} from "react-redux";
import {Navigate, Route, useNavigate} from "react-router-dom";
import Loader from "components/common/Loader/Loader.tsx";

const ProtectedRoute = ({unAuth = false, ...rest}) => {
	const user = useSelector((state) => state.authSlice.user);
	const isAuthChecked = useSelector((state) => state.authSlice.isAuth);
	const navigate = useNavigate();
	
	
	// if (!isAuthChecked) {
	// 	return <Loader/>;
	// }
	
	if (isAuthChecked && !unAuth && !user) {
		navigate("/login")
	}
	
	if (isAuthChecked && unAuth && user) {
		navigate("/")
	}
	
	return <Route {...rest} />;
};

export const Auth = (props) => <ProtectedRoute {...props} />;

export const UnAuth = (props) => <ProtectedRoute unAuth {...props} />;