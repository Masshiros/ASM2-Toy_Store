import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};
// login action
export const loginUserAction = createAsyncThunk('users/login')