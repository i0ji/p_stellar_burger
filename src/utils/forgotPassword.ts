import {BASE_URL} from "utils/routs.ts";

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

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};


