import {BASE_URL} from "utils/routs.ts";
import {checkResponse} from "utils/check-response.ts";

export function getIngredients() {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
        .then(data => data.data);
}