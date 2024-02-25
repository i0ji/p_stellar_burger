const getUser = () => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: {}
            })
        }, 1000)
    })
}

const login = () => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                accessToken: 'test-token',
                refreshToken: 'refresh-token',
                user: {},
            })
        }, 1000)
    })
}

const logout = () => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

export const api = {
    getUser,
    login,
    logout
}