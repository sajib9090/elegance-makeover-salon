import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPurchaseItems: [],
};

export const purchaseLogSlice = createSlice({
  name: "purchaseLog",
  initialState,
  reducers: {
    addPurchaseLog: (state, action) => {
      const data = action.payload;

      const existingItem = state.selectedPurchaseItems?.find(
        (item) => item?._id === data?._id
      );

      if (existingItem) {
        existingItem.p_quantity = data?.p_quantity;
      } else {
        state.selectedPurchaseItems.push({
          ...data,
          p_quantity: data?.p_quantity,
        });
      }
    },
    removeSingleItem: (state, action) => {
      const { id } = action.payload;
      state.selectedPurchaseItems = state.selectedPurchaseItems?.filter(
        (item) => !(item._id === id)
      );
    },
  },
});

export const { addPurchaseLog, removeSingleItem } = purchaseLogSlice.actions;

export default purchaseLogSlice.reducer;

export const selectedItems = (state) => state.purchaseLog.selectedPurchaseItems;