import {BASE_URL} from "utils/routs.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkResponse} from "utils/check-response.ts";
import {refreshToken} from "slices/authSlice.ts";
import {IUserData} from "interfaces/sliceInterfaces";
import {setAuthChecked, setUser} from "slices/authSlice.ts";


// --------------- LOGIN ---------------

export const getUser = createAsyncThunk('auth/login',
    async (userData: IUserData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, requestOptions);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.user;
        } catch (error) {
            throw error;
        }
    });


// --------------- GET USER DATA ---------------

export const getUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('Access token not found');
        }

        const response = await fetch(`${BASE_URL}/auth/user`, {
            headers: {
                Authorization: token,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return data.user;
    }
);


// --------------- UPDATE USER DATA ---------------

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (updatedData) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('Нет токена доступа!');
        }

        const response = await fetch(`${BASE_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении данных пользователя');
        }

        const data = await response.json();
        return data.user;
    }
);


// --------------- FETCH WITH REFRESH ---------------

export const fetchWithRefreshThunk = createAsyncThunk(
    'auth/fetchWithRefresh',
    async (url: URL, options) => {
        try {
            const res = await fetch(url, options);
            return await checkResponse(res);
        } catch (err) {
            if (err.message === 'jwt expired') {
                const refreshData = await refreshToken();
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await checkResponse(res);
            } else {
                return Promise.reject(err);
            }
        }
    }
);


// --------------- REGISTER ---------------
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: IUserData) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
);


// --------------- RESET PASSWORD ---------------

export const resetPassword = async (password: string, token: string): Promise<any> => {
    const requestBody = {
        password: password,
        token: token,
    };

    try {
        const response = await fetch(`${BASE_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        return await response.json();
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};


// --------------- FORGOT PASSWORD ---------------

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string) => {
        const requestBody = {
            email: email,
        };

        try {
            const response = await fetch(`${BASE_URL}/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            return await response.json();
        } catch (error) {
            console.error('Error during password reset:', error);
            throw error;
        }
    }
);


// --------------- AUTH CHECK ---------------

// export const checkUserAuth = () => {
//     return async (dispatch) => {
//         if (localStorage.getItem('accessToken')) {
//             try {
//                 await dispatch(getUser);
//             } catch (error) {
//                 localStorage.removeItem('refreshToken');
//                 localStorage.removeItem('accessToken');
//                 dispatch(setUser(null));
//             } finally {
//                 dispatch(setAuthChecked(true));
//             }
//         } else {
//             dispatch(setAuthChecked(true));
//         }
//     };
// };
// const getTokenExpirationTime = (token) => {
//     try {
//         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//         return decodedToken.exp * 1000; // Convert to milliseconds
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return null;
//     }
// };
// export const checkUserAuth = () => {
//     return async (dispatch) => {
//         const accessToken = localStorage.getItem('accessToken');
//         const refreshToken = localStorage.getItem('refreshToken');
//
//         if (accessToken) {
//             try {
//                 const expirationTime = getTokenExpirationTime(accessToken);
//
//
//                 if (expirationTime && expirationTime < Date.now()) {
//
//                     await dispatch(refreshToken());
//                     await dispatch(getUser);
//                 }
//             } catch (error) {
//                 localStorage.removeItem('refreshToken');
//                 localStorage.removeItem('accessToken');
//                 dispatch(setUser(null));
//             } finally {
//                 dispatch(setAuthChecked(true));
//             }
//         } else {
//             dispatch(setAuthChecked(true));
//         }
//     };
// };

export const checkUserAuth = () => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            try {
                // Check if the access token is still valid
                const response = await fetch(`${BASE_URL}/auth/user`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    // If not valid, try refreshing the tokens
                    await dispatch(refreshToken());
                }

                // Fetch user data with the new access token or the existing one
                const userResponse = await fetch(`${BASE_URL}/auth/user`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();

                    // Dispatch action to update user data in the Redux store
                    dispatch(setUser(userData));
                }

            } catch (error) {
                // Handle errors, e.g., logout user
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                dispatch(setUser(null));
            } finally {
                dispatch(setAuthChecked(true));
            }
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};



// --------------- LOGOUT ---------------

export const logoutUser = createAsyncThunk('auth/logoutUser', async (refreshTokenValue) => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: refreshTokenValue,
        }),
    });

    const logoutData = await checkResponse(response);

    console.log(response)

    if (!logoutData.success) {
        return Promise.reject(logoutData);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return logoutData;
});