import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v2/all');
    return response.data;
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    region: "", // Added region state
    current: 0,  // added for slider
  visible: 12, // added for pagination
  },
 reducers: {
    setRegion(state, action) {
      state.region = action.payload;
        state.visible = 12; // reset visible when region changes

    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    nextSlide(state) {
      state.current = (state.current + 1) % 3;
    },
    prevSlide(state) {
      state.current = (state.current - 1 + 3) % 3;
    },
    loadMore(state) {
      state.visible += 12;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {  setRegion,
  setCurrent,
  nextSlide,
  prevSlide,
  loadMore, } = countrySlice.actions;
export default countrySlice.reducer;
