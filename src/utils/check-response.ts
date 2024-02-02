export function checkResponse(response: Response) {
	if (!response.ok) {
		throw new Error('Something went wrong');
	}
	return response.json();
}