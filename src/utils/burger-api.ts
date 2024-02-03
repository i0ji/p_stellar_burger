import {INGREDIENTS_DATA_URL} from "utils/routs.ts";
import {checkResponse} from "utils/check-response.ts";

export function getIngredients() {
    return fetch(INGREDIENTS_DATA_URL)
        .then(checkResponse)
        .then(data => data.data);
}