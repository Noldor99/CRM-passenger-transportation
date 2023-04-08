import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTrips: [],
  showFilter: true,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { trips, search } = action.payload;
      const tempTrips = trips.filter(
        (trip) =>
          trip.name.toLowerCase().includes(search.toLowerCase()) ||
          trip.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTrips = tempTrips;
    },
    SORT_TRIPS(state, action) {
      const { trips, sort } = action.payload;
      let tempTrips = [];
      if (sort === "latest") {
        tempTrips = trips;
      }

      if (sort === "lowest-price") {
        tempTrips = trips.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempTrips = trips.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempTrips = trips.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempTrips = trips.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredTrips = tempTrips;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { trips, category } = action.payload;
      let tempTrips = [];
      if (category === "All") {
        tempTrips = trips;
      } else {
        tempTrips = trips.filter((trip) => trip.category === category);
      }
      state.filteredTrips = tempTrips;
    },
    FILTER_BY_BRAND(state, action) {
      const { trips, brand } = action.payload;
      let tempTrips = [];
      if (brand === "All") {
        tempTrips = trips;
      } else {
        tempTrips = trips.filter((trip) => trip.brand === brand);
      }
      state.filteredTrips = tempTrips;
    },
    FILTER_BY_PRICE(state, action) {
      const { trips, price } = action.payload;
      let tempTrips = [];
      tempTrips = trips.filter((trip) => trip.price <= price);

      state.filteredTrips = tempTrips;
    },
    SET_FILTER(state, action) {
      state.showFilter = !state.showFilter;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_TRIPS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  SET_FILTER,
} = filterSlice.actions;

export const selectFilteredTrips = (state) => state.filter.filteredTrips;
export const selectshowFilter = (state) => state.filter.showFilter;

export default filterSlice.reducer;
