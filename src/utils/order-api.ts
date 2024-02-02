export const orderUrl = 'https://norma.nomoreparties.space/api/orders'

export function createOrder(ingredientIds: string[]) {
	
	const requestBody = {
		ingredients: ingredientIds
	};
	
	return fetch(orderUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Something went wrong');
			}
			return response.json();
		})
		
}