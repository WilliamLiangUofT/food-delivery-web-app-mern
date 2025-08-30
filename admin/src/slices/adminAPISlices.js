import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api'}),
    tagTypes: ['Items'],
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
        })
    })
})

export const { useGetItemsQuery, useAddItemMutation, useRemoveItemMutation } = apiSlice;


