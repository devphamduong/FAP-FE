import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        email: "",
        fullName: "",
        username: "",
        gender: "",
        id: "",
        dob: "",
        address: "",
        role: ""
    },
    isAuthenticated: false,
    isLoading: true,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        getAccountActionFail: (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = {
                email: "",
                fullName: "",
                username: "",
                gender: "",
                id: "",
                dob: "",
                address: "",
                role: ""
            };
        },
        logoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                email: "",
                fullName: "",
                username: "",
                gender: "",
                id: "",
                dob: "",
                address: "",
                role: ""
            };
        },
    },
});

export const { loginAction, getAccountAction, logoutAction, getAccountActionFail } = accountSlice.actions;

export default accountSlice.reducer;