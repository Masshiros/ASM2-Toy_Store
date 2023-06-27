import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice.js";
import productReducer from "../slices/products/productSlices.js";
import categoryReducer from "../slices/categories/categoriesSlice.js";
import brandReducer from "../slices/categories/brandsSlice.js";
import colorReducer from "../slices/categories/colorsSlice.js";
// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});
export default store;
