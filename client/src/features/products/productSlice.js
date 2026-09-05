import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductRequest, deleteProductRequest, getMyProductsRequest, getProductRequest, getProductsRequest, updateProductRequest } from "./productAPI";

const message = (error) => error.response?.data?.message || error.message || "Something went wrong.";
const label = (value = "") => value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
const normalize = (product) => ({ ...product, id: product._id, category: label(product.category), condition: label(product.condition), image: product.images?.[0] || "https://placehold.co/800x600/f0ebff/6d3df5?text=BarterX" });

export const fetchProducts = createAsyncThunk("products/fetchAll", async (params = {}, api) => {
  try { return (await getProductsRequest(params)).data.data; } catch (error) { return api.rejectWithValue(message(error)); }
});
export const fetchProductById = createAsyncThunk("products/fetchOne", async (id, api) => {
  try { return (await getProductRequest(id)).data.data.product; } catch (error) { return api.rejectWithValue(message(error)); }
});
export const createProduct = createAsyncThunk("products/create", async (details, api) => {
  try { return (await createProductRequest(details)).data.data.product; } catch (error) { return api.rejectWithValue(message(error)); }
});
export const fetchMyProducts = createAsyncThunk("products/fetchMine", async (_, api) => {
  try { return (await getMyProductsRequest()).data.data.products; } catch (error) { return api.rejectWithValue(message(error)); }
});
export const updateProduct = createAsyncThunk("products/update", async ({ id, details }, api) => {
  try { return (await updateProductRequest(id, details)).data.data.product; } catch (error) { return api.rejectWithValue(message(error)); }
});
export const deleteProduct = createAsyncThunk("products/delete", async (id, api) => {
  try { await deleteProductRequest(id); return id; } catch (error) { return api.rejectWithValue(message(error)); }
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], myItems: [], currentProduct: null, pagination: null, loading: false, creating: false, error: null },
  reducers: { clearProductError: (state) => { state.error = null; } },
  extraReducers: (builder) => builder
    .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.products.map(normalize); state.pagination = action.payload.pagination; })
    .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(fetchProductById.pending, (state) => { state.loading = true; state.currentProduct = null; state.error = null; })
    .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.currentProduct = normalize(action.payload); })
    .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(createProduct.pending, (state) => { state.creating = true; state.error = null; })
    .addCase(createProduct.fulfilled, (state, action) => { state.creating = false; state.items.unshift(normalize(action.payload)); })
    .addCase(createProduct.rejected, (state, action) => { state.creating = false; state.error = action.payload; })
    .addCase(fetchMyProducts.pending, (state) => { state.loading = true; state.error = null; })
    .addCase(fetchMyProducts.fulfilled, (state, action) => { state.loading = false; state.myItems = action.payload.map(normalize); })
    .addCase(fetchMyProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
    .addCase(updateProduct.pending, (state) => { state.creating = true; state.error = null; })
    .addCase(updateProduct.fulfilled, (state, action) => { const product = normalize(action.payload); state.creating = false; state.currentProduct = product; state.myItems = state.myItems.map((item) => item.id === product.id ? product : item); })
    .addCase(updateProduct.rejected, (state, action) => { state.creating = false; state.error = action.payload; })
    .addCase(deleteProduct.fulfilled, (state, action) => { state.myItems = state.myItems.filter((item) => item.id !== action.payload); }),
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
