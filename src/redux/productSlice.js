// src/redux/slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData as fetchApiData, addData as addApiData, editData as editApiData } from '../services/apiService';

const fetchProductData = createAsyncThunk('data/fetchData', async (category) => {
    const data = await fetchApiData(category);
    return data;
});

// Async thunk to add data
const addProductData = createAsyncThunk('data/addData', async (newData) => {
    const data = await addApiData(newData);
    return data;
  });
  
  // Async thunk to edit data
  const editProductData = createAsyncThunk('data/editData', async (updatedData) => {
    const data = await editApiData(updatedData);
    return data;
  });

const productSlice = createSlice({
  name: 'products',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editProductData.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
export { fetchProductData, addProductData, editProductData };
