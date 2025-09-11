import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', credentials: "include"}),
    tagTypes: ['Items', 'Order'],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => '/foodMenu/list',
            providesTags: ['Items']
        }),
        addItem: builder.mutation({
            query: (formData) => ({url: '/foodMenu/add', method: 'POST', body: formData}),
            invalidatesTags: ["Items"]
        }),
        removeItem: builder.mutation({
            query: (id) => ({url: '/foodMenu/remove', method: 'POST', body: {id}}),
            invalidatesTags: ["Items"]
        }),
        listOrder: builder.query({
            query: () => '/order/list',
            providesTags: ['Order']
        }),
        loginAdmin: builder.mutation({
            query: ({email, password}) => ({url: '/user/admin/login', method: 'POST', body: {email, password}})
        })
    })
})
// The tags above help with rerenders. When a mutation is performed, the invalidatesTag will basically cause a rerender for getItems, redisplayign the value
export const { useGetItemsQuery, useAddItemMutation, useRemoveItemMutation, useListOrderQuery, useLoginAdminMutation } = apiSlice;


