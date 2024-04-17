import styles from "profile/ProfilePage.module.scss";

import {logoutUser} from "utils/api.ts";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "hooks/reduxHooks.ts";

export default function ProfileMenu() {


    // --------------- NAVIGATION & BACKGROUND---------------

    const navigate = useNavigate();

    const location = useLocation();

    // --------------- VARS & STATES ---------------

    const dispatch = useDispatch();
    const isActive = location.pathname === '/profile';
    const refreshToken = localStorage.getItem('refreshToken');
    //  --------------- LOGOUT
    const handleLogout = () => {
        dispatch(logoutUser(refreshToken));
        navigate('/');
    };

    return (
        <div>
            <div className={styles.profile_buttons}>
                <Link
                    to='/profile'
                    className={`mb-10 `}
                >
                    <Button
                        extraClass={`text text_type_main-medium ${isActive ? styles.isActive : ''}`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        Профиль
                    </Button>
                </Link>
                <Link
                    to='/profile/orders'
                    className={`mb-10 `}
                >
                    <Button
                        extraClass={`text text_type_main-medium ${!isActive ? styles.isActive : ''}`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                    >
                        История заказов
                    </Button>
                </Link>
                <Link
                    to='/'
                    className={`mb-10`}
                >
                    <Button
                        extraClass={`text text_type_main-medium`}
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={handleLogout}
                        data-testid="profile_quit_button"
                    >
                        Выход
                    </Button>
                </Link>
                <p>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
        </div>
    );
}