import {checkResponse} from "utils/check-response.ts";
import {useReducer} from "react";

export function (url: string, additionalOpt: any) {
	return fetch(url)
		.then(checkResponse)
}