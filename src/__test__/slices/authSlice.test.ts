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
    it('should handle setUser', () => {
        const user = {id: 1, username: 'testuser'};
        const action = {type: setUser.type, payload: user};
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
    });

    it('should handle setAuthChecked', () => {
        const action = {type: setAuthChecked.type, payload: true};
        const state = authReducer(initialState, action);
        expect(state.authChecked).toBe(true);
    });

    it('should handle loginUser.pending', () => {
        const state = authReducer(initialState, {type: loginUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should handle loginUser.fulfilled', () => {
        const user = {id: 1, username: 'testuser'};
        const action = {type: loginUser.fulfilled.type, payload: user};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
        expect(state.loginError).toBe(false);
    });

    it('should handle loginUser.rejected', () => {
        const action = {type: loginUser.rejected.type, error: {message: 'Error message'}};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
        expect(state.loginError).toBe(true);
    });

    it('should handle registerUser.pending', () => {
        const state = authReducer(initialState, {type: registerUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should handle registerUser.fulfilled', () => {
        const user = {id: 1, username: 'testuser'};
        const action = {type: registerUser.fulfilled.type, payload: user};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.user).toEqual(user);
        expect(state.isAuth).toBe(true);
    });

    it('should handle registerUser.rejected', () => {
        const action = {type: registerUser.rejected.type, error: {message: 'Error message'}};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });

    it('should handle logoutUser.pending', () => {
        const state = authReducer(initialState, {type: logoutUser.pending.type});
        expect(state.status).toEqual('loading');
    });

    it('should handle logoutUser.fulfilled', () => {
        const state = authReducer(initialState, {type: logoutUser.fulfilled.type});
        expect(state.status).toEqual('idle');
        expect(state.isAuth).toBe(false);
        expect(state.user).toBeNull();
    });

    it('should handle logoutUser.rejected', () => {
        const action = {type: logoutUser.rejected.type, error: {message: 'Error message'}};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
        expect(state.isAuth).toBe(false);
    });

    it('should handle getUserData.fulfilled', () => {
        const userData = {id: 1, email: 'test@example.com'};
        const action = {type: getUserData.fulfilled.type, payload: userData};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.userData).toEqual(userData);
    });

    it('should handle getUserData.rejected', () => {
        const action = {type: getUserData.rejected.type, error: {message: 'Error message'}};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });

    it('should handle updateUserData.fulfilled', () => {
        const updatedUserData = {id: 1, email: 'updated@example.com'};
        const action = {type: updateUserData.fulfilled.type, payload: updatedUserData};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.userData).toEqual(updatedUserData);
    });

    it('should handle updateUserData.rejected', () => {
        const action = {type: updateUserData.rejected.type, error: {message: 'Error message'}};
        const state = authReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Error message');
    });
});