import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
// initials State
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } =
        payload;
      // make request

      // token - authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // image
      const { data } = await axios.post(`${baseURL}/brands`, {
        name,
      },config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch
export const fetchBrandAction = createAsyncThunk(
  "brand/fetch all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try { 
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const brandSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});
// reducer
const brandReducer = brandSlice.reducer;
export default brandReducer;
