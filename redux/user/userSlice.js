// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         users: [],
//         isLoading: false,
//         isError: false,
//     },
//     reducers: {
//         getUserStart: (state) => {
//             state.isLoading = true
//             state.isError = false
//         },
//         getUserSuccess: (state, action) => {
//             state.isLoading = false
//             state.users = action.payload
//             state.isError = false
//         },
//         getUserFailure: (state) => {
//             state.isLoading = false
//             state.isError = true
//         }
//     }
// })

// export const { getUserStart, getUserSuccess, getUserFailure } = userSlice.actions

// export default userSlice.reducer