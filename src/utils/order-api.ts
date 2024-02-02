import {checkResponse} from "utils/check-response.ts";
import {ORDER_URL} from "utils/routs.ts";

export function createOrder(ingredientIds: string[]) {
	
	const requestBody = {
		ingredients: ingredientIds
	};
	
	return fetch(ORDER_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	})
		.then(checkResponse)
}