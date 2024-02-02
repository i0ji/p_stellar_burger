export const orderUrl = 'https://norma.nomoreparties.space/api/orders'

export function createOrder(ingredientIds: string[]) {
	
	const requestBody = {
		ingredients: ingredientIds
	};
	
	fetch(orderUrl, {
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
		.then(responseData => {
			if (responseData.success) {
				console.log(responseData.order.number);
				return responseData.order.number;
			} else {
				console.error('YOU WILL NOT GET FOOD:', responseData);
			}
		})
		.catch(error => {
			console.error('Got this error:', error);
		});
}