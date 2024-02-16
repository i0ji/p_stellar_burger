export function checkResponse(response: Response) {
    if (!response.ok) {
        throw new Error('Кое-чего случилось...');
    }
    return response.json();
}