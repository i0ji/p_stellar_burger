import {checkResponse} from "utils/check-response.ts";
import {BASE_URL} from "utils/routs.ts";
import {IUserData} from "interfaces/sliceInterfaces";


// --------------- REFRESH ---------------

const refreshToken = async () => {
    const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    const refreshData = await checkResponse(response);
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
};


// --------------- LOGIN ---------------

// export const loginAsync = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
//     try {
//         const response = await loginUserApi(credentials);
//
//         if (response.success) {
//             // Сохранение токенов в localStorage или куки
//             localStorage.setItem('accessToken', response.accessToken);
//             localStorage.setItem('refreshToken', response.refreshToken);
//
//             // Переадресация на маршрут '/'
//             // (вам, возможно, нужно использовать history.push('/'))
//             window.location.href = '/';
//
//             return response.user;
//         } else {
//             return rejectWithValue(response.message);
//         }
//     } catch (error) {
//         return rejectWithValue('Ошибка при выполнении запроса');
//     }
// });


// --------------- FETCH WITH REFRESH ---------------

export const fetchWithRefresh = async (url: URL, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: string) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


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


// --------------- REGISTER ---------------

// export const registerUser = async (userData: IUserData) => {
//     try {
//         const response = await fetch(`${BASE_URL}/auth/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw error;
//     }
// };


// --------------- FORGOT PASSWORD ---------------

export const forgotPassword = async (email: string): Promise<any> => {
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
};