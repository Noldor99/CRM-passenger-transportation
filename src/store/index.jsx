import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import tripReducer from "./slice/tripSlice";
import userReducer from "./slice/userSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  user: userReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
