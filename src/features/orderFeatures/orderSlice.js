import { createSlice } from '@reduxjs/toolkit';
import { sendOrderRequest } from './orderThunks';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: null,
    },
    reducers: {

        resetOrderStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(sendOrderRequest.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })

            .addCase(sendOrderRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
            })

            .addCase(sendOrderRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload || 'Failed to send order';
            });
    },
});

export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;