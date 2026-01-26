import { createSlice } from "@reduxjs/toolkit";

const foodPageSlice = createSlice({
  name: "FoodPage",
  initialState: {
    foodList: []
  },
  reducers: {
    setFoodList: (store, action) => {
      store.foodList = [...store.foodList, ...action.payload];
    },
    setFoodListEmpty: (store) => {
      store.foodList = [];
    },
    setSearchFoodList: (store, action) => {
      store.foodList = action.payload;
    }
  },
});

export const foodPageSliceAction = foodPageSlice.actions;
export default foodPageSlice;
