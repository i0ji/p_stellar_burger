// export const refreshToken = async () => {
//     const response = await fetch(`${BASE_URL}/auth/token`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify({
//             token: localStorage.getItem("refreshToken"),
//         }),
//     });
//     const refreshData = await checkResponse(response);
//     if (!refreshData.success) {
//         return Promise.reject(refreshData);
//     }
//     localStorage.setItem("refreshToken", refreshData.refreshToken);
//     localStorage.setItem("accessToken", refreshData.accessToken);
//     return refreshData;
// };