import {BASE_URL} from "utils/routs.ts";


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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};
