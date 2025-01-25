// src/redux/slice.js
import { createSlice, createAsyncThunk } 
    from '@reduxjs/toolkit';
import { fetchData as fetchApiData, fetchCategoryData as fetchCatData,
    addData as addApiData, 
    editData as editApiData } 
    from '../services/apiService';

const fetchCategoryData = createAsyncThunk('data/fetchCategoryData', async () => {
    const data = await fetchCatData();
    return data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { selectedItem:'',data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
export { fetchCategoryData};
