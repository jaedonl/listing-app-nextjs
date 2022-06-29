import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
    },
    reducers: {        
        loginStart: (state) => {
            state.isLoading = true
            state.isError = false
        }, 
        loginSuccess: (state, action) => {
            state.isLoading = false           
            state.user = action.payload
            state.isError = false
        },
        loginFailure: (state) => {
            state.isLoading = false
            state.isError = true
        },
        loggingOut: (state) => {
            state.user = null
            state.isLoading = false
            state.isError = false
        },
        reset: (state) => {            
            state.isError = false
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, loggingOut, reset } = authSlice.actions

export default authSlice.reducer