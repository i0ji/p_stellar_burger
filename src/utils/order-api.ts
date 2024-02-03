import {checkResponse} from "utils/check-response.ts";
import {BASE_URL} from "utils/routs.ts";

export function createOrder(ingredientIds: string[]) {

    const requestBody = {
        ingredients: ingredientIds
    };

    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(checkResponse)
}