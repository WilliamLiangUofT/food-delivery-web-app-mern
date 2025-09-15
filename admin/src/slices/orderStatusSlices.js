import { createSlice } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

const initialState = {
    orders: []
};

const orderStatusSlice = createSlice({
    name: 'orderStatus',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setStatus: (state, action) => {
            const {order_id, new_status} = action.payload;
            const order = state.orders.find(o => o._id === order_id); // finds first/only
            if (order) {
                order.order_status = new_status;
            }
        }
    }
});

export const { setStatus, setOrders } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;


