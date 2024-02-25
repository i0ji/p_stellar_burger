import {BASE_URL} from 'utils/routs.ts';

export const registerUser = async (
    email: string,
    password: string,
    name: string
) => {
    const requestBody = {
        email: email,
        password: password,
        name: name,
    };

    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during user registration:', error);
        throw error;
    }
}