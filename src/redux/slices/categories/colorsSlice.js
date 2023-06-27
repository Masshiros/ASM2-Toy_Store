import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
// initials State
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

export const createColorAction = createAsyncThunk(
  "color/create",
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
      const { data } = await axios.post(`${baseURL}/colors`, {
        name,
      },config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// fetch
export const fetchColorAction = createAsyncThunk(
  "colors/fetch all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try { 
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});
// reducer
const colorReducer = colorSlice.reducer;
export default colorReducer;
