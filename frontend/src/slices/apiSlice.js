import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', credentials: "include"}),
    tagTypes: ['Token', 'Cart', 'Order'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: ({name, email, password}) => ({url: 'user/register', method: 'POST', body: {name, email, password}}),
            invalidatesTags: ['Token', 'Order']
        }),
        loginUser: builder.mutation({
            query: ({email, password}) => ({url: 'user/login', method: 'POST', body: {email, password}}),
            invalidatesTags: ['Token', 'Cart', 'Order']
        }),
        logoutUser: builder.mutation({
            query: () => ({url: 'user/logout', method: 'POST'}),
            invalidatesTags: ['Token', 'Cart', 'Order']
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
        }),
        placeOrder: builder.mutation({
            query: ({userId, items, subTotalAmount, deliveryFee, address}) => ({url: '/order/place', method: 'POST', body: {userId, items, subTotalAmount, deliveryFee, address}}),
            invalidatesTags: ['Order']
        }),
        verifyOrder: builder.mutation({
            query: ({success, orderId}) => ({url: '/order/verify', method: 'POST', body: {success, orderId}}),
            invalidatesTags: ['Order']
        }),
        listOrder: builder.query({
            query: () => '/order/list',
            providesTags: ['Order']
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
    useListCartQuery,
    usePlaceOrderMutation,
    useVerifyOrderMutation,
    useListOrderQuery
} = apiSlice;

