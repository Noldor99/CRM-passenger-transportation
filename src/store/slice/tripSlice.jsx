import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../data";

const initialState = {
  trips: data,
  minPrice: null,
  maxPrice: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    STORE_TRIPS(state, action) {
      state.trips = action.payload.trips;
    },
    GET_PRICE_RANGE(state, action) {
      const trips = state.trips;
      const array = [];
      trips.map((trip) => {
        const price = trip.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);
      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_TRIPS, GET_PRICE_RANGE } = tripSlice.actions;

export const selectTrips = (state) => state.trip.trips;
export const selectMinPrice = (state) => state.trip.minPrice;
export const selectMaxPrice = (state) => state.trip.maxPrice;

export default tripSlice.reducer;
