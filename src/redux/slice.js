// src/redux/slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Async thunk to add data
const addData = createAsyncThunk('data/addData', async (newData) => {
    const response = await axios.post('https://fakestoreapi.com/products', newData);
    return response.data;
  });
  
  // Async thunk to edit data
  const editData = createAsyncThunk('data/editData', async (updatedData) => {
    const { id, ...changes } = updatedData;
    const response = await axios.put(`https://fakestoreapi.com/products/${id}`, changes);
    return response.data;
  });

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editData.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default dataSlice.reducer;
export { fetchData, addData, editData };
