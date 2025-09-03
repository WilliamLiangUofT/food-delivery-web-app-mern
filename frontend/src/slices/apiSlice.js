import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', credentials: "include"}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: ({name, email, password}) => ({url: 'user/register', method: 'POST', body: {name, email, password}})
        }),
        loginUser: builder.mutation({
            query: ({email, password}) => ({url: 'user/login', method: 'POST', body: {email, password}})
        }),
        logoutUser: builder.mutation({
            query: () => ({url: 'user/logout', method: 'POST'})
        }),
        getItems: builder.query({
            query: () => '/foodMenu/list'
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetItemsQuery } = apiSlice;

