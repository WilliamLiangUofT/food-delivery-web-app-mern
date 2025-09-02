import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api/user', credentials: "include"}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: ({name, email, password}) => ({url: '/register', method: 'POST', body: {name, email, password}})
        }),
        loginUser: builder.mutation({
            query: ({email, password}) => ({url: '/login', method: 'POST', body: {email, password}})
        }),
        logoutUser: builder.mutation({
            query: () => ({url: '/logout', method: 'POST'})
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = apiSlice;

