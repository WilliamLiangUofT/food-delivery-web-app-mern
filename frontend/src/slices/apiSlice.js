import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', credentials: "include"}),
    tagTypes: ['Token', 'Cart'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: ({name, email, password}) => ({url: 'user/register', method: 'POST', body: {name, email, password}}),
            invalidatesTags: ['Token']
        }),
        loginUser: builder.mutation({
            query: ({email, password}) => ({url: 'user/login', method: 'POST', body: {email, password}}),
            invalidatesTags: ['Token', 'Cart']
        }),
        logoutUser: builder.mutation({
            query: () => ({url: 'user/logout', method: 'POST'}),
            invalidatesTags: ['Token', 'Cart']
        }),
        getCookie: builder.query({
            query: () => '/user/me',
            providesTags: ['Token']
        }),
        getItems: builder.query({
            query: () => '/foodMenu/list'
        }),
        addCart: builder.mutation({
            query: ({item_id}) => ({url: '/cart/addCart', method: 'POST', body: {item_id}}),
            invalidatesTags: ['Cart']
        }),
        removeCart: builder.mutation({
            query: ({item_id}) => ({url: '/cart/removeCart', method: 'POST', body: {item_id}}),
            invalidatesTags: ['Cart']
        }),
        listCart: builder.query({
            query: () => '/cart/listCart',
            providesTags: ['Cart']
        })
    })
})

export const { 
    useRegisterUserMutation, 
    useLoginUserMutation, 
    useLogoutUserMutation, 
    useGetCookieQuery, 
    useGetItemsQuery,
    useAddCartMutation,
    useRemoveCartMutation,
    useListCartQuery
} = apiSlice;

