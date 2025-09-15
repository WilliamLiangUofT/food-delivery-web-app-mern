import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/adminAPISlices';
import orderStatusSlice from './slices/orderStatusSlices'

const store = configureStore({
    reducer: {
        orderStatus: orderStatusSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;

