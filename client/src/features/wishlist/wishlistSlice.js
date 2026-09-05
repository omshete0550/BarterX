import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlistRequest,
  getWishlistRequest,
  removeFromWishlistRequest,
} from "./wishlistAPI";

const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong.";
const normalize = (product) => ({
  ...product,
  id: product._id,
  category: (product.category || "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
  condition: (product.condition || "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
  image: product.images?.[0] || "https://placehold.co/800x600/f0ebff/6d3df5?text=BarterX",
});

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, thunkAPI) => {
  try { return (await getWishlistRequest()).data.data.wishlist.map(normalize); }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const addToWishlist = createAsyncThunk("wishlist/add", async (product, thunkAPI) => {
  try { await addToWishlistRequest(product.id || product._id); return normalize(product); }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});
export const removeFromWishlist = createAsyncThunk("wishlist/remove", async (productId, thunkAPI) => {
  try { await removeFromWishlistRequest(productId); return productId; }
  catch (error) { return thunkAPI.rejectWithValue(errorMessage(error)); }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchWishlist.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchWishlist.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
    .addCase(fetchWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(addToWishlist.fulfilled, (state, action) => { if (!state.items.some((item) => item.id === action.payload.id)) state.items.unshift(action.payload); })
    .addCase(removeFromWishlist.fulfilled, (state, action) => { state.items = state.items.filter((item) => item.id !== action.payload); }),
});

export default wishlistSlice.reducer;
