// src/redux/slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData as fetchApiData, addData as addApiData, editData as editApiData } from '../services/apiService';

const fetchData = createAsyncThunk('data/fetchData', async () => {
    const data = await fetchApiData();
    return data;
});

// Async thunk to add data
const addData = createAsyncThunk('data/addData', async (newData) => {
    const data = await addApiData(newData);
    return data;
  });
  
  // Async thunk to edit data
  const editData = createAsyncThunk('data/editData', async (updatedData) => {
    const data = await editApiData(updatedData);
    return data;
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
