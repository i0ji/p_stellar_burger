import {
    loginUser,
    registerUser,
    logoutUser,
    getUserData,
    updateUserData
} from "utils/api.ts";
import authReducer, {initialState, setAuthChecked, setUser} from 'slices/authSlice';

jest.mock('utils/api.ts');

describe('authSlice test', () => {
    // --------------- AUTH
    it('should set user', () => {
        const user = {
            id: 1,
            username: 'testUser'
        };
        const action = {
            type: setUser.type,
            payload: user
        };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
    });

    it('should check auth', () => {
        const action = {
            type: setAuthChecked.type,
            payload: true
        };
        const state = authReducer(initialState, action);
        expect(state.authChecked).toBe(true);
    });
    // --------------- LOGIN
    it('should check login user: pending', () => {
        const state = authReducer(initialState, {type: loginUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should check login user: fulfilled', () => {
        const user = {
            id: 1,
            username: 'testUser'
        };
        const action = {
            type: loginUser.fulfilled.type,
            payload: user
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
        expect(state.loginError).toBe(false);
    });

    it('should check login user: rejected', () => {
        const action = {
            type: loginUser.rejected.type,
            error: {message: 'Error message'}
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
        expect(state.loginError).toBe(true);
    });
    // --------------- REGISTER
    it('should check register user: pending', () => {
        const state = authReducer(initialState, {type: registerUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should check register user: fulfilled', () => {
        const user = {
            id: 1,
            username: 'testUser'
        };
        const action = {
            type: registerUser.fulfilled.type,
            payload: user
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
    });

    it('should check register user: rejected', () => {
        const action = {
            type: registerUser.rejected.type,
            error: {message: 'Error message'}
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
    // --------------- LOGOUT
    it('should check logout user: pending', () => {
        const state = authReducer(initialState, {type: logoutUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should check logout user: fulfilled', () => {
        const state = authReducer(initialState, {type: logoutUser.fulfilled.type});
        expect(state.status).toEqual('idle');
        expect(state.isAuth).toBe(false);
        expect(state.user).toBeNull();
    });

    it('should check logout user: rejected', () => {
        const action = {
            type: logoutUser.rejected.type,
            error: {message: 'Error message'}
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
        expect(state.isAuth).toBe(false);
    });
    // --------------- GET DATA
    it('should get user data: fulfilled', () => {
        const userData = {
            id: 1,
            email: 'test@example.com'
        };
        const action = {
            type: getUserData.fulfilled.type,
            payload: userData
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.userData).toEqual(userData);
    });

    it('should get user data: rejected', () => {
        const action = {
            type: getUserData.rejected.type,
            error: {message: 'Error message'}
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
    // --------------- UPDATE DATA
    it('should update user data: pending', () => {
        const state = authReducer(initialState, {type: updateUserData.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should update user data: fulfilled', () => {
        const updatedUserData = {
            id: 1,
            email: 'testd@test.com'
        };
        const action = {
            type: updateUserData.fulfilled.type,
            payload: updatedUserData
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.userData).toEqual(updatedUserData);
    });

    it('should update user data: rejected', () => {
        const action = {
            type: updateUserData.rejected.type,
            error: {message: 'Error message'}
        };
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
    // --------------- INVALID ACTION TYPE
    it('should return initial state due to an invalid action', () => {
        const action = {
            type: 'invalid action type',
        };
        const state = authReducer(initialState, action);
        expect(state.userData).toEqual(initialState.userData);
    })
});