export const ingredientsDataUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
    return fetch(ingredientsDataUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `NO BURGERS! CUZ OF: ${res.status} ARGHHHHHH!`
                );
            }
            return res.json();
        })
        .then(data => data.data);
}