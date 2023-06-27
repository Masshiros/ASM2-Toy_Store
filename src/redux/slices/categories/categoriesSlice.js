import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
// initials State
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

export const createCategoryAction = createAsyncThunk(
  "category/create",
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
      const { data } = await axios.post(`${baseURL}/categories`, {
        name,
      },config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch
export const fetchCategoryAction = createAsyncThunk(
  "category/fetch all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try { 
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});
// reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
