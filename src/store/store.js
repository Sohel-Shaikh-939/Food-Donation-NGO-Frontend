import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../routes/Home/homeSlice";
import foodPageSlice from "../routes/FoodPage/foodPageSlice";

const store = configureStore({
  reducer: {
    Home: homeSlice.reducer,
    FoodPage: foodPageSlice.reducer,
  },
});

export default store;
