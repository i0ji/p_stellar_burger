//
// import {checkResponse} from "utils/check-response.ts";
//
// export function createOrder(URL, METHOD, OPT: string[]) {
//
// 	const requestBody = {
// 		ingredients: OPT
// 	};
//
// 	return fetch(URL, {
// 		method: METHOD,
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(requestBody),
// 	})
// 		.then(checkResponse)
// }