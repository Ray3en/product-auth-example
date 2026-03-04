// src/app/store/auth.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    token: string | null;
}

const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload }: PayloadAction<{ user: any; token: string; remember: boolean }>
        ) => {
            const { user, token, remember } = payload;
            state.user = user;
            state.token = token;

            // ВЫБОР ХРАНИЛИЩА
            const storage = remember ? localStorage : sessionStorage;

            storage.setItem('token', token);
            storage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
            sessionStorage.clear();
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;